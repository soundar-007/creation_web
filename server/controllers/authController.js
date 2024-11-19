const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User Doesn't Exists !! ", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid Password !!", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const cookieOptions = {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, 
      sameSite:'None',
    };

    res.cookie("session_x_autxz", token, cookieOptions);
    res.status(200).json({ message: "Login successful", success: true, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in", error, success: false });
  }
};

exports.checkAuth = async (req, res) => {
  const token = req.cookies?.session_x_autxz || null;
  if (!token) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ isAuthenticated: true, user: decoded });
  } catch (error) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Invalid or expired token" });
  }
};
exports.logout = (req, res) => {
  res.cookie("session_x_autxz", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    expires: new Date(0),
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
