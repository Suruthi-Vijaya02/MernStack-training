const express = require("express");

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();


// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get All Users
router.get("/", getAllUsers);

// Get User By ID
router.get("/:id", getUserById);

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);

module.exports = router;