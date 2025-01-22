import User from "../models/user.model.js";
import { redis } from "../lib/redis.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId: userId }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); // 7 days
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attack , cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // preven CSRF attack , cross-site request fargery attack
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attack , cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // preven CSRF attack , cross-site request fargery attack
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });
    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateToken(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }else{
      res.status(401).json({message : "Invalid username or password"})
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
      await redis.del(`refresh_token:${decode.userId}`);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error ", error: error.message });
  }
};

export const refreshToken =  async (req, res) =>{
  try {
    const token =  req.cookies.refreshToken
    if(!token){
      res.status(401).json({message : "No refreshtoken provided"})
    }
    const decode =  jwt.verify(token , process.env.REFRESH_TOKEN)
    const storedTokenn = await redis.get(`refresh_token:${decode.userId}`)
    if(storedTokenn != token){
      res.status(401).json({message : "Invalid refresh token"})
    }
    const accessToken = jwt.sign({userId : decode.userId} , process.env.ACCESS_TOKEN , {
      expiresIn : "15m"
    } )
    res.cookie("accessToken" , accessToken , {
      httpOnly : true,
      secure : process.env.NODE_ENV === "production",
      sameSite : "strict",
      maxAge : 15 * 60 * 1000
    })
    res.json({message : "Token refreshed successfully"})
  } catch (error) {
    res.status(401).json({message : "Sever error", error : error.message})
  }
}