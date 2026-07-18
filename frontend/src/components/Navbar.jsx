import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Plants", path: "/plants" },
    { name: "Seeds", path: "/seeds" },
    { name: "Essentials", path: "/essentials" },
    { name: "Flowers", path: "/flowers" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-forest py-4 border-b border-moss/30">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="hover:cursor-pointer font-poppins font-bold text-2xl md:text-3xl text-farmPink tracking-tight"
        >
          Fresh Farm
        </h1>

        <ul className="hidden md:flex gap-8 font-inter font-medium text-cream">
          {navLinks.map((link) => (
            <li
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`relative pb-1 cursor-pointer border-b-2 transition-colors duration-300 ${
                isActive(link.path)
                  ? "border-farmPink text-farmPink"
                  : "border-transparent hover:border-pond hover:text-farmPink"
              }`}
            >
              {link.name}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Wishlist Icon */}
          <button
            onClick={() => navigate("/wishlist")}
            className="relative p-2 text-cream hover:text-farmPink transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
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
            {wishlistItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-farmPink text-cream text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => navigate("/cart")}
            className="bg-pond text-cream font-poppins font-medium py-2 px-4 rounded-xl hover:bg-farmPink hover:text-forest transition-all duration-300 flex items-center gap-2"
          >
            <span>Cart ({cartCount})</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar