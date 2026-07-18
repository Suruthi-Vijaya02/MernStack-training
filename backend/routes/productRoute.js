const express = require("express");
const router = express.Router();
const { createProduct, getProductByID,getAllProduct,updateProduct,deleteProduct } = require("../controllers/productController");

router.post("/create", createProduct);
router.get("/get/:id",getProductByID);
router.get("/get",getAllProduct);
router.put("/update/:id",updateProduct);
router.delete("/delete/:id",deleteProduct);

module.exports = router;