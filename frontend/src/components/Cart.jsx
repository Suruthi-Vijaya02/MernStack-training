import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "@/features/cart/cartSlice"

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const cart = useSelector((state) => state.cart.items)
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (cart.length === 0) {
    return (
      <div className="bg-beige min-h-screen py-16 px-4 text-center">
        <div className="w-20 h-20 bg-blush rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-poppins font-bold text-forest mb-4">Your cart is empty</h2>
        <button 
          onClick={() => navigate("/plants")}
          className="bg-forest text-cream px-6 py-3 rounded-xl hover:bg-moss transition-all"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="bg-blush min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-forest text-cream py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-poppins font-bold text-center">
            Shopping Cart
          </h1>
          <p className="text-center text-cream/70 mt-2 font-inter">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-cream rounded-2xl p-4 md:p-6 shadow-sm border border-beige flex flex-col sm:flex-row gap-4"
                >
                  <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-blush rounded-xl overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-poppins font-semibold text-forest text-lg">{item.name}</h3>
                      <p className="text-sage font-medium mt-1">₹{item.price} / unit</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 bg-beige rounded-lg flex items-center justify-center text-forest font-bold hover:bg-forest hover:text-cream transition-all disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="font-poppins font-bold text-forest w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="w-8 h-8 bg-beige rounded-lg flex items-center justify-center text-forest font-bold hover:bg-forest hover:text-cream transition-all"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-poppins font-bold text-forest text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="text-farmPink hover:text-red-600 transition-colors self-start sm:self-center p-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-cream rounded-2xl p-6 shadow-sm border border-beige sticky top-24">
              <h2 className="font-poppins font-bold text-forest text-xl mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-inter text-forest/70">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-inter text-forest/70">
                  <span>Shipping</span>
                  <span className="text-moss font-medium">Free</span>
                </div>
                <div className="border-t border-beige pt-3 flex justify-between font-poppins font-bold text-forest text-lg">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-forest text-cream font-poppins font-medium py-3 rounded-xl hover:bg-moss transition-all mb-3"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate("/plants")}
                className="w-full bg-cream text-forest border-2 border-forest font-poppins font-medium py-3 rounded-xl hover:bg-forest hover:text-cream transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart