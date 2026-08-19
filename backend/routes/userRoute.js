const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  getMe,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { userAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", userAuth, getMe);           // ← NEW
router.get("/", userAuth, getAllUsers);       // ← PROTECTED
router.get("/:id", userAuth, getUserById);    // ← PROTECTED
router.put("/:id", userAuth, updateUser);     // ← PROTECTED
router.delete("/:id", userAuth, deleteUser);   // ← PROTECTED

module.exports = router;