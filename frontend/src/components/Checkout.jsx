import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { clearCart } from "@/features/cart/cartSlice"

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.items)

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePlaceOrder = async (e) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      setError("Your cart is empty.")
      return
    }

    // Catch a malformed cart item before it hits the backend, and name the culprit
    // instead of letting it surface as an opaque 500 error.
    const invalidItem = cartItems.find((item) => !(item.id || item._id))
    if (invalidItem) {
      setError(
        `"${invalidItem.name || "An item"}" in your cart is missing its product ID — remove it and re-add it from the product page.`
      )
      return
    }

    setPlacing(true)
    setError("")

    const token = localStorage.getItem("token")

    const payload = {
      items: cartItems.map((item) => ({
        product: item.id || item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      shippingAddress: formData,
      paymentMethod,
    }

    try {
      const res = await axios.post("http://localhost:3000/orders/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.data.success) {
        dispatch(clearCart())
        navigate(`/order-confirmation/${res.data.order._id}`)
      }
    } catch (err) {
      console.error("Place order error:", err)
      setError(err.response?.data?.message || "Failed to place order. Please try again.")
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="bg-blush min-h-screen py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-poppins font-bold text-forest text-center mb-8">
          Checkout
        </h1>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Shipping form */}
          <form
            onSubmit={handlePlaceOrder}
            className="md:col-span-3 bg-cream rounded-2xl border border-beige shadow-sm p-6 md:p-8"
          >
            <h2 className="font-poppins font-bold text-forest text-lg mb-4">Shipping Address</h2>

            <label className="block text-sm font-medium text-forest mb-1">Full Name</label>
            <input
              name="fullName" value={formData.fullName} onChange={handleChange} required
              className="w-full border border-sage rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
              placeholder="Suruthi Vijaya"
            />

            <label className="block text-sm font-medium text-forest mb-1">Phone</label>
            <input
              name="phone" value={formData.phone} onChange={handleChange} required
              className="w-full border border-sage rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
              placeholder="9876543210"
            />

            <label className="block text-sm font-medium text-forest mb-1">Address</label>
            <input
              name="addressLine" value={formData.addressLine} onChange={handleChange} required
              className="w-full border border-sage rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
              placeholder="12, Gandhi Street"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-forest mb-1">City</label>
                <input
                  name="city" value={formData.city} onChange={handleChange} required
                  className="w-full border border-sage rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                  placeholder="Madurai"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-1">State</label>
                <input
                  name="state" value={formData.state} onChange={handleChange} required
                  className="w-full border border-sage rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                  placeholder="Tamil Nadu"
                />
              </div>
            </div>

            <label className="block text-sm font-medium text-forest mb-1">Pincode</label>
            <input
              name="pincode" value={formData.pincode} onChange={handleChange} required
              className="w-full border border-sage rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
              placeholder="625001"
            />

            <h2 className="font-poppins font-bold text-forest text-lg mb-3">Payment Method</h2>
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex-1 py-3 rounded-xl font-medium border-2 transition-all ${
                  paymentMethod === "cod" ? "bg-forest text-cream border-forest" : "border-sage text-forest"
                }`}
              >
                Cash on Delivery
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("online")}
                className={`flex-1 py-3 rounded-xl font-medium border-2 transition-all ${
                  paymentMethod === "online" ? "bg-forest text-cream border-forest" : "border-sage text-forest"
                }`}
              >
                Pay Online
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={placing || cartItems.length === 0}
              className="w-full bg-forest text-cream py-3.5 rounded-xl font-poppins font-medium hover:bg-moss transition-all disabled:opacity-50 shadow-lg"
            >
              {placing ? "Placing Order..." : `Place Order — ₹${totalAmount.toLocaleString()}`}
            </button>
          </form>

          {/* Cart summary */}
          <div className="md:col-span-2 bg-cream rounded-2xl border border-beige shadow-sm p-6 h-fit">
            <h2 className="font-poppins font-bold text-forest text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-blush rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "https://placehold.co/100x100?text=Fresh+Farm"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://placehold.co/100x100?text=Fresh+Farm"
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-forest font-medium text-sm truncate">{item.name}</p>
                    <p className="text-sage text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-forest font-bold text-sm">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-beige mt-4 pt-4 flex justify-between">
              <span className="font-poppins font-bold text-forest">Total</span>
              <span className="font-poppins font-bold text-forest">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout