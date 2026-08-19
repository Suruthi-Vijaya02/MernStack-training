import React from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "@/features/cart/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/features/wishlist/wishlistSlice"
import { useSelector } from "react-redux"

const FALLBACK_IMAGE = "https://placehold.co/300x300?text=Fresh+Farm"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state) => state.wishlist.items)

  const isInWishlist = wishlistItems.some((item) => item.id === product._id)

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id))
    } else {
      dispatch(addToWishlist({ ...product, id: product._id }))
    }
  }

  return (
    <div className="bg-cream rounded-2xl border border-beige overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="w-full h-56 bg-blush relative overflow-hidden">
        <img
          src={product.image || FALLBACK_IMAGE}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null // stop it looping if the fallback ever fails too
            e.target.src = FALLBACK_IMAGE
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-poppins font-semibold text-forest text-lg leading-tight">
          {product.name}
        </h3>

        <p className="text-sage text-sm mt-1 line-clamp-2 flex-1">
          {product.description || "Premium quality product from Fresh Farm."}
        </p>

        <p className="text-forest font-bold text-lg mt-3">
          ₹{product.price}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => dispatch(addToCart({ ...product, id: product._id }))}
            className="flex-1 bg-forest text-cream py-2.5 rounded-xl font-medium hover:bg-moss transition-all active:scale-95"
          >
            Add to Cart
          </button>

          <button
            onClick={handleWishlistToggle}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all ${
              isInWishlist
                ? "bg-farmPink border-farmPink text-cream"
                : "border-sage text-forest hover:border-farmPink hover:text-farmPink"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill={isInWishlist ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard