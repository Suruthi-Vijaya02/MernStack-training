import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const OrderConfirmation = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token")
      try {
        const res = await axios.get(`http://localhost:3000/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.data.success) {
          setOrder(res.data.order)
        }
      } catch (err) {
        console.error("Fetch order error:", err)
        setError("Couldn't load your order details.")
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [orderId])

  const stepIndex = {
    pending: 0,
    confirmed: 1,
    shipped: 2,
    delivered: 3,
    cancelled: -1,
  }[order?.status] ?? 0

  const steps = ["Ordered", "Packed", "Shipped", "Delivered"]

  if (loading) {
    return (
      <div className="bg-blush min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-forest border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="bg-blush min-h-screen flex items-center justify-center px-4">
        <div className="bg-cream rounded-2xl border border-beige p-8 text-center max-w-md">
          <p className="text-forest font-poppins font-bold text-lg mb-2">Order not found</p>
          <p className="text-sage text-sm mb-6">{error || "This order doesn't exist or you don't have access to it."}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-forest text-cream px-6 py-3 rounded-xl font-medium hover:bg-moss transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  })
  const estimatedDelivery = new Date(
    new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })

  return (
    <div className="bg-blush min-h-screen py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">

        <div className="bg-cream rounded-2xl shadow-lg border border-beige overflow-hidden">

          <div className="bg-forest py-8 px-6 text-center">
            <div className="w-16 h-16 bg-moss rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-cream text-2xl md:text-3xl font-poppins font-bold">
              {order.status === "cancelled" ? "Order Cancelled" : "Order Confirmed!"}
            </h1>
            <p className="text-cream/80 font-inter mt-2 text-sm md:text-base">
              Thank you for shopping with Fresh Farm
            </p>
          </div>

          <div className="p-6 md:p-8">

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blush rounded-xl p-4 text-center">
                <p className="text-forest/60 text-xs font-inter uppercase tracking-wider mb-1">Order ID</p>
                <p className="text-forest font-bold font-poppins text-sm md:text-base">
                  #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div className="bg-blush rounded-xl p-4 text-center">
                <p className="text-forest/60 text-xs font-inter uppercase tracking-wider mb-1">Order Date</p>
                <p className="text-forest font-bold font-poppins text-sm md:text-base">{orderDate}</p>
              </div>
              <div className="bg-blush rounded-xl p-4 text-center col-span-2">
                <p className="text-forest/60 text-xs font-inter uppercase tracking-wider mb-1">Estimated Delivery</p>
                <p className="text-moss font-bold font-poppins text-sm md:text-base">{estimatedDelivery}</p>
              </div>
            </div>

            {/* Items */}
            <div className="mb-8 space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blush rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "https://placehold.co/100x100?text=Fresh+Farm"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100?text=Fresh+Farm" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-forest text-sm font-medium truncate">{item.name}</p>
                    <p className="text-sage text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-forest font-bold text-sm">₹{item.price * item.quantity}</p>
                </div>
              ))}
              <div className="border-t border-beige pt-3 flex justify-between">
                <span className="font-poppins font-bold text-forest">Total Paid</span>
                <span className="font-poppins font-bold text-forest">₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Progress Steps */}
            {order.status !== "cancelled" && (
              <div className="mb-8">
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-beige -translate-y-1/2" />
                  {steps.map((label, i) => (
                    <div key={label} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= stepIndex ? "bg-forest" : "bg-beige"}`}>
                        {i <= stepIndex ? (
                          <svg className="w-4 h-4 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <div className="w-2.5 h-2.5 bg-forest/30 rounded-full" />
                        )}
                      </div>
                      <span className={`text-xs font-inter ${i <= stepIndex ? "text-forest font-medium" : "text-forest/50"}`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-sage/10 border border-sage/20 rounded-xl p-4 mb-8 flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-moss flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-forest/80 text-sm font-inter leading-relaxed">
                We'll send you an email with tracking details once your order is shipped.
                Our team carefully packs each plant to ensure it arrives healthy and happy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-forest text-cream font-poppins font-medium py-3 px-6 rounded-xl hover:bg-moss transition-all duration-300 text-center"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate("/plants")}
                className="flex-1 bg-cream text-forest border-2 border-forest font-poppins font-medium py-3 px-6 rounded-xl hover:bg-forest hover:text-cream transition-all duration-300 text-center"
              >
                Browse Plants
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation