import React from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate()

  // Mock order data — replace with actual order state/context
  const orderId = Math.random().toString(36).substring(2, 10).toUpperCase()
  const orderDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-blush min-h-screen py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Success Card */}
        <div className="bg-cream rounded-2xl shadow-lg border border-beige overflow-hidden">
          
          {/* Top Green Banner */}
          <div className="bg-forest py-8 px-6 text-center">
            <div className="w-16 h-16 bg-moss rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-cream" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h1 className="text-cream text-2xl md:text-3xl font-poppins font-bold">
              Order Confirmed!
            </h1>
            <p className="text-cream/80 font-inter mt-2 text-sm md:text-base">
              Thank you for shopping with Fresh Farm
            </p>
          </div>

          {/* Order Details */}
          <div className="p-6 md:p-8">
            
            {/* Order Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blush rounded-xl p-4 text-center">
                <p className="text-forest/60 text-xs font-inter uppercase tracking-wider mb-1">
                  Order ID
                </p>
                <p className="text-forest font-bold font-poppins text-sm md:text-base">
                  #{orderId}
                </p>
              </div>
              <div className="bg-blush rounded-xl p-4 text-center">
                <p className="text-forest/60 text-xs font-inter uppercase tracking-wider mb-1">
                  Order Date
                </p>
                <p className="text-forest font-bold font-poppins text-sm md:text-base">
                  {orderDate}
                </p>
              </div>
              <div className="bg-blush rounded-xl p-4 text-center col-span-2">
                <p className="text-forest/60 text-xs font-inter uppercase tracking-wider mb-1">
                  Estimated Delivery
                </p>
                <p className="text-moss font-bold font-poppins text-sm md:text-base">
                  {estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-beige -translate-y-1/2" />
                
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs font-inter text-forest font-medium">Ordered</span>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-beige rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-forest/30 rounded-full" />
                  </div>
                  <span className="text-xs font-inter text-forest/50">Packed</span>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-beige rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-forest/30 rounded-full" />
                  </div>
                  <span className="text-xs font-inter text-forest/50">Shipped</span>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-beige rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-forest/30 rounded-full" />
                  </div>
                  <span className="text-xs font-inter text-forest/50">Delivered</span>
                </div>
              </div>
            </div>

            {/* Delivery Note */}
            <div className="bg-sage/10 border border-sage/20 rounded-xl p-4 mb-8 flex items-start gap-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-moss flex-shrink-0 mt-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <p className="text-forest/80 text-sm font-inter leading-relaxed">
                We'll send you an email with tracking details once your order is shipped. 
                Our team carefully packs each plant to ensure it arrives healthy and happy.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-forest text-cream font-poppins font-medium py-3 px-6 rounded-xl hover:bg-moss transition-all duration-300 text-center"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/plants')}
                className="flex-1 bg-cream text-forest border-2 border-forest font-poppins font-medium py-3 px-6 rounded-xl hover:bg-forest hover:text-cream transition-all duration-300 text-center"
              >
                Browse Plants
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
              <svg className="w-5 h-5 text-moss" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 9a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-forest/70 text-xs font-inter">Quality Assured</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
              <svg className="w-5 h-5 text-moss" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-forest/70 text-xs font-inter">Fast Delivery</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
              <svg className="w-5 h-5 text-moss" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <p className="text-forest/70 text-xs font-inter">Secure Payment</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout