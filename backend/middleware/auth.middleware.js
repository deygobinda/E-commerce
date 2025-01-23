import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const proudctRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });
    }
    try {
      const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decode?.userId).select("-password");
      if (!user) {
        console.log(user);
        return res.status(401).json({ message: "User not found " });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - access token expried" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in auth-middleware", error.message);
    res.status(500).json({ message: "Server error ", error: error.message });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized - admin only" });
  }
};
