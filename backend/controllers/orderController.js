const Order = require("../models/orderModel")

// userAuth sets req.user = decoded JWT payload, not a full user doc, so the id could be
// under `_id`, `id`, or `userId` depending on what your login controller signed the token with.
const getUserId = (req) => req.user?._id || req.user?.id || req.user?.userId

// ─── ADD ORDER (user) ───
// POST /orders/create
exports.addOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must contain at least one item" })
    }

    const userId = getUserId(req)
    if (!userId) {
      return res.status(401).json({ success: false, message: "Could not identify user from token" })
    }

    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    })

    res.status(201).json({ success: true, order })
  } catch (err) {
    console.error("Add order error:", err)
    res.status(500).json({ success: false, message: "Failed to place order" })
  }
}

// ─── GET ORDER BY ID (user — only their own order) ───
// GET /orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product", "name image")

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" })
    }

    const isOwner = order.user.toString() === getUserId(req)?.toString()
    const isAdmin = req.user.role === "admin"

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: "Not authorized to view this order" })
    }

    res.status(200).json({ success: true, order })
  } catch (err) {
    console.error("Get order by id error:", err)
    res.status(500).json({ success: false, message: "Failed to fetch order" })
  }
}

// ─── GET ALL ORDERS (admin) ───
// GET /orders/get
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })

    res.status(200).json({ success: true, orders })
  } catch (err) {
    console.error("Get orders error:", err)
    res.status(500).json({ success: false, message: "Failed to fetch orders" })
  }
}

// ─── UPDATE ORDER STATUS (admin) ───
// PUT /orders/status/:id
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const allowedStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" })
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" })
    }

    res.status(200).json({ success: true, order })
  } catch (err) {
    console.error("Update order status error:", err)
    res.status(500).json({ success: false, message: "Failed to update order status" })
  }
}

// ─── UPDATE ORDER (user — only their own, and only before it ships) ───
// PUT /orders/update/:id
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" })
    }

    if (order.user.toString() !== getUserId(req)?.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to modify this order" })
    }

    if (["shipped", "delivered", "cancelled"].includes(order.status)) {
      return res.status(400).json({ success: false, message: "Order can no longer be modified" })
    }

    const { shippingAddress, paymentMethod } = req.body
    if (shippingAddress) order.shippingAddress = shippingAddress
    if (paymentMethod) order.paymentMethod = paymentMethod

    await order.save()

    res.status(200).json({ success: true, order })
  } catch (err) {
    console.error("Update order error:", err)
    res.status(500).json({ success: false, message: "Failed to update order" })
  }
}

// ─── DELETE ORDER (admin) ───
// DELETE /orders/delete/:id
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" })
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" })
  } catch (err) {
    console.error("Delete order error:", err)
    res.status(500).json({ success: false, message: "Failed to delete order" })
  }
}