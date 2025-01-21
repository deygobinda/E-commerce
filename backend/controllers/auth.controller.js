import e from "express";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ user, message: "User created successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Register yourself first",
      });
    }
    const isMatch = await  user.comparePassword(password)
    if(!isMatch) {
        return res.status(400).json({message : "Invalid username or password"})
    }
    res.json(user)
  } catch (error) {
    res.status(404).json({error : error.message})
  }
};
export const logout = async (req, res) => {
  res.send("logout up");
};
