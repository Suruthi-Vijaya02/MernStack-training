import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/features/cart/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/features/wishlist/wishlistSlice"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const isInWishlist = wishlistItems.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product))
    }
  }

  if (!product) return null

  return (
    <div className="group bg-cream rounded-2xl border border-beige overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative">
      
      {/* Wishlist Heart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleWishlist()
        }}
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-cream/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-cream transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-colors ${isInWishlist ? "text-farmPink fill-farmPink" : "text-forest/40 hover:text-farmPink"}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill={isInWishlist ? "currentColor" : "none"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Image */}
      <div className="relative overflow-hidden bg-blush">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-forest/90 text-cream text-xs font-medium px-2.5 py-1 rounded-full">
          In Stock
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h2 className="text-forest text-base md:text-lg font-semibold font-poppins leading-snug line-clamp-2 min-h-[3rem]">
          {product.name}
        </h2>

        <div className="flex items-center gap-2 mt-2 mb-4">
          <span className="text-charcoal text-lg md:text-xl font-bold font-poppins">
            ₹{product.price}
          </span>
          <span className="text-beige line-through text-sm">
            ₹{Math.round(product.price * 1.2)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-forest text-cream font-medium text-sm md:text-base py-2.5 rounded-xl hover:bg-moss active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard