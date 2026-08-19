import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import { loginSuccess, logout } from "@/features/user/userSlice"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BgWrapper from "@/components/BgWrapper"
import Home from "@/pages/Home"
import Plants from "@/pages/Plants"
import Seeds from "@/pages/Seeds"
import Essentials from "@/pages/Essentials"
import Flowers from "@/pages/Flowers"
import Wishlist from "@/pages/Wishlist"
import Cart from "@/components/Cart"
import Checkout from "@/components/Checkout"
import SignIn from "@/login/signIn"
import SignUp from "@/login/signUp"
import AdminProducts from "@/components/AdminProducts"
import ProtectedRoute from "@/components/ProtectedRoute"
import AdminRoute from "@/components/AdminRoute"
import OrderConfirmation from "@/components/Orderconfirmation"

function App() {
  const dispatch = useDispatch()

  // Auth Persistence
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token")
      if (!token) return

      try {
        const res = await axios.get("http://localhost:3000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.data.success && res.data.user) {
          dispatch(loginSuccess({ user: res.data.user, token }))
        }
      } catch (err) {
        console.log("Session expired")
        dispatch(logout())
      }
    }
    fetchUserProfile()
  }, [dispatch])

  return (
    <>
      <Routes>
        {/* Public Store Pages */}
        <Route
          path="/"
          element={
            <BgWrapper>
              <Navbar />
              <Home />
            </BgWrapper>
          }
        />
        <Route path="/plants" element={<><Navbar /><Plants /></>} />
        <Route path="/seeds" element={<><Navbar /><Seeds /></>} />
        <Route path="/essentials" element={<><Navbar /><Essentials /></>} />
        <Route path="/flowers" element={<><Navbar /><Flowers /></>} />
        <Route path="/wishlist" element={<><Navbar /><Wishlist /></>} />

        {/* Protected Customer Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <><Navbar /><Cart /></>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <><Navbar /><Checkout /></>
            </ProtectedRoute>
          }
        />
       <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        {/* Admin Route — No Footer, clean admin experience */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <><Navbar /><AdminProducts /></>
            </AdminRoute>
          }
        />

        {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {/* Footer hidden on admin page */}
      <Routes>
        <Route path="/admin" element={null} />
        <Route path="*" element={<Footer />} />
      </Routes>
    </>
  )
}

export default App