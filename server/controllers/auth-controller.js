const bcrtypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//register
const registerUser = async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const hashedPassword = await bcrtypt.hash(password, 12);
    const newUser = new User({
      email,
      phone,
      password,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some Error Occurred" });
  }

  //login
  const login = async (req, res) => {
    try {
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Some Error Occurred" });
    }
  };
};

//logout

//auth middleware

module.exports = {
  registerUser,
};
