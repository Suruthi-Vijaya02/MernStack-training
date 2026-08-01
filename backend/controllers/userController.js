const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: newUser._id },
      "secret_key",
      {
        expiresIn: "8h",
      }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};




// LOGIN USER
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "secret_key",
      {
        expiresIn: "8h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};



// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });

  }
};



//getById
const getUserById = async (req, res) => {
  try {

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });

  }
};



// UPDATE USER


const updateUser = async (req, res) => {
  try {

    const { name, email, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });

  }
};




// DELETE USER
const deleteUser = async (req, res) => {
  try {

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });

  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};