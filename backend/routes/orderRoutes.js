const express = require("express")
const router = express.Router()

const {
  addOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController")
const { userAuth } = require("../middleware/authMiddleware");
const { adminAuth } = require("../middleware/adminMiddleware");

router.post("/create", userAuth, addOrder)          // user places an order
router.get("/get", adminAuth, getOrders)     // admin views all orders
router.get("/:id", userAuth, getOrderById)           // user views their own order (admin can too)
router.put("/status/:id", adminAuth, updateOrderStatus) // admin updates order status
router.put("/update/:id", userAuth, updateOrder)     // user updates their own order (pre-shipping only)
router.delete("/delete/:id", adminAuth, deleteOrder)    // admin deletes an order

module.exports = router