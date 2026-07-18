import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Plants from '@/pages/Plants'
import Seeds from '@/pages/Seeds'
import Essentials from '@/pages/Essentials'
import Flowers from '@/pages/Flowers'
import Wishlist from '@/pages/Wishlist'
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/seeds" element={<Seeds />} />
        <Route path="/essentials" element={<Essentials />} />
        <Route path="/flowers" element={<Flowers />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App