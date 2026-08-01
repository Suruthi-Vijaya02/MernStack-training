import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BgWrapper from '@/components/BgWrapper'
import Home from '@/pages/Home'
import Plants from '@/pages/Plants'
import Seeds from '@/pages/Seeds'
import Essentials from '@/pages/Essentials'
import Flowers from '@/pages/Flowers'
import Wishlist from '@/pages/Wishlist'
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'
import SignIn from "@/login/signIn";
import SignUp from "@/login/signUp";

function App() {
  return (
    <>
      <Routes>
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
        <Route path="/cart" element={<><Navbar /><Cart /></>} />
        <Route path="/checkout" element={<><Navbar /><Checkout /></>} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App