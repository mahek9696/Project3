const bcrtypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//register
const registerUser = async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    // Check if user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrtypt.hash(password, 12);
    const newUser = new User({
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Some Error Occurred" });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const checkPasswordMatch = await bcrtypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    // const token = jwt.sign(
    //   { id: checkUser._id },
    //   { role: checkUser.role },
    //   { email: checkUser.email },
    //   "CLIENT_SECRET_KEY",
    //   { expiresIn: "15m" }
    // );
    const token = jwt.sign(
      {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "30m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true in production
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
        },
      });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Some Error Occurred" });
  }
};

//logout

const logoutUser = async (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logout successful" });
};

//auth middleware

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized User ! " });
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized User ! " });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
};
