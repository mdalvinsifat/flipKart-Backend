const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/AuthModels");
const fs = require("fs");
const path = require("path");


exports.registerController = async (req, res) => {
  try {
    const { fullName, email, password, confirm_password, gender } = req.body;


    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const image = req.file ? req.file.filename : null;

    const newUser = await Auth.create({
      fullName,
      email,
      password: hashedPassword,
      confirm_password: hashedPassword,
      gender,
      image,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin },
      process.env.JWT,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        gender: newUser.gender,
        image: newUser.image,
      },
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Auth.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT, 
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, 
    });

    const { password: _, confirm_password, ...userData } = existingUser._doc;
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.UpdateUser = async (req, res) => {
  const { fullName, email, gender, password } = req.body;

  try {
    const userId = req.params.id;

    // Find user by ID
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedImage = user.image;
    if (req.file) {
      updatedImage = req.file.filename;
    }

    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.password = hashedPassword;
    user.image = updatedImage;

    // Save updated user
    const updatedUser = await user.save();

    const { password: _, confirm_password, ...userData } = updatedUser._doc;

    res.status(200).json({ message: "User updated successfully", user: userData });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.getProduct = async(req, res ) =>{
  try {
    const user = await Auth.find()
    res.status(200).json({
      success:true , 
      message:"user Get successfully", 
      user 
    })
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}




exports.DeleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await Auth.findByIdAndDelete(userId);
    
    if (user.image) {
      const imagePath = path.join(__dirname, "../authUploads", user.image); 
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);  // Deletes the file
      }
    }


    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};