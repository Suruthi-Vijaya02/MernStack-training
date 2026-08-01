const express = require("express");
const router = express.Router();

const {
    createProduct,
    getAllProduct,
    getProductByID,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const { userAuth } = require("../middleware/authMiddleware");
const { adminAuth } = require("../middleware/adminMiddleware");

// Create Product (Admin Only)
router.post("/create", userAuth, adminAuth, createProduct);

// Get All Products
router.get("/get", getAllProduct);

// Get Product By ID
router.get("/get/:id", getProductByID);

// Update Product (Admin Only)
router.put("/update/:id", userAuth, adminAuth, updateProduct);

// Delete Product (Admin Only)
router.delete("/delete/:id", userAuth, adminAuth, deleteProduct);

module.exports = router;