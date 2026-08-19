import { useState, useEffect } from "react"
import axios from "axios"

// Fetches live products from the backend (same source your admin panel writes to).
// Pass a category to get only that category, or omit it to get everything.
export const useProducts = (category) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await axios.get("http://localhost:3000/products/get")
        if (!isMounted) return
        if (res.data.success) {
          const all = res.data.products
          setProducts(category ? all.filter((p) => p.category === category) : all)
        }
      } catch (err) {
        if (isMounted) setError(err)
        console.error("Failed to fetch products:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchProducts()
    return () => { isMounted = false }
  }, [category])

  return { products, loading, error }
}