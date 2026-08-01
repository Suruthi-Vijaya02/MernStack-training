import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Plants", path: "/plants" },
    { name: "Seeds", path: "/seeds" },
    { name: "Essentials", path: "/essentials" },
    { name: "Flowers", path: "/flowers" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-forest/95 backdrop-blur-md border-white/10 py-3 shadow-lg"
          : "bg-black/10 backdrop-blur-sm border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Navigation */}
        <ul className="hidden md:flex items-center gap-6 font-inter font-medium text-cream">
          {navLinks.map((link) => (
            <li
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`cursor-pointer border-b-2 pb-1 transition-all duration-300 ${
                isActive(link.path)
                  ? "border-farmPink text-farmPink"
                  : "border-transparent hover:border-farmPink hover:text-farmPink"
              }`}
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="absolute left-1/2 -translate-x-1/2 cursor-pointer font-logo italic text-3xl font-semibold text-farmPink hover:scale-105 transition-transform"
        >
          Fresh Farm
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Wishlist */}
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
              <span className="absolute -top-1 -right-1 bg-farmPink text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="bg-pond text-cream px-4 py-2 rounded-xl font-medium hover:bg-farmPink hover:text-forest transition-all duration-300"
          >
            Cart ({cartCount})
          </button>

          {/* Sign In */}
          <button
            onClick={() => navigate("/signin")}
            className="border border-cream text-cream px-4 py-2 rounded-xl font-medium hover:bg-cream hover:text-forest transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;