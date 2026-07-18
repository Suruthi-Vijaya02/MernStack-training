import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import ProductCard from "@/components/ProductCard"

const Wishlist = () => {
  const navigate = useNavigate()
  
  const wishlistItems = useSelector((state) => state.wishlist.items)

  return (
    <div className="bg-beige min-h-screen py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-poppins text-center text-charcoal">
          My Wishlist
        </h1>
        <p className="text-center text-forest/60 font-inter mb-12">
          {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
        </p>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-blush rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-poppins font-semibold text-forest mb-3">Your wishlist is empty</h2>
            <p className="text-forest/60 font-inter mb-8">Save items you love and they'll appear here</p>
            <button
              onClick={() => navigate("/plants")}
              className="bg-forest text-cream font-poppins font-medium py-3 px-8 rounded-xl hover:bg-moss transition-all"
            >
              Explore Plants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist