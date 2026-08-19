import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [toast, setToast] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "plants",
    price: "",
    quantity: "",
    image: "",
  })

  const token = localStorage.getItem("token")

  // Create axios instance with auth header
  const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  // ─── FETCH PRODUCTS ───
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get("/products/get")
      if (res.data.success) {
        setProducts(res.data.products)
      }
    } catch (err) {
      showToast("error", "Failed to load products")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // ─── TOAST HELPER ───
  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  // ─── FORM HANDLERS ───
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "plants",
      price: "",
      quantity: "",
      image: "",
    })
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || "",
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      image: product.image || "",
    })
    // Scroll up to the form so the edit is visible
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
    resetForm()
  }

  // ─── SUBMIT (CREATE OR UPDATE) ───
  const handleSubmit = async (e) => {
    e.preventDefault()
    setActionLoading(true)

    const payload = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    }

    try {
      let res
      if (editingProduct) {
        // UPDATE
        res = await api.put(`/products/update/${editingProduct._id}`, payload)
        if (res.data.success) {
          showToast("success", "Product updated successfully!")
        }
      } else {
        // CREATE
        res = await api.post("/products/create", payload)
        if (res.data.success) {
          showToast("success", "Product created successfully!")
        }
      }

      // CRITICAL FIX: Reset form first, then refresh the list
      setEditingProduct(null)
      resetForm()
      await fetchProducts() // ← This ensures the UI shows latest data from DB

    } catch (err) {
      console.error("Submit error:", err)
      showToast("error", err.response?.data?.message || "Operation failed")
    } finally {
      setActionLoading(false)
    }
  }

  // ─── DELETE ───
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return

    setActionLoading(true)
    try {
      const res = await api.delete(`/products/delete/${id}`)
      if (res.data.success) {
        showToast("success", "Product deleted!")
        await fetchProducts() // ← Refresh after delete
      }
    } catch (err) {
      console.error("Delete error:", err)
      showToast("error", err.response?.data?.message || "Delete failed")
    } finally {
      setActionLoading(false)
    }
  }

  // ─── STATS ───
  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
  const lowStock = products.filter((p) => p.quantity < 5).length

  const categories = ["plants", "seeds", "essentials", "flowers"]
  const categoryColors = {
    plants: "bg-green-100 text-green-700",
    seeds: "bg-amber-100 text-amber-700",
    essentials: "bg-blue-100 text-blue-700",
    flowers: "bg-pink-100 text-pink-700",
  }
  const categoryDots = {
    plants: "bg-forest",
    seeds: "bg-amber-500",
    essentials: "bg-pond",
    flowers: "bg-farmPink",
  }

  // Group products by category for the space-saving grouped display
  const groupedProducts = categories
    .map((cat) => ({
      category: cat,
      items: products.filter((p) => p.category === cat),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-poppins font-bold text-forest text-center">Admin Dashboard</h1>
          <p className="text-sage mt-1 text-center">Manage your Fresh Farm inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-cream rounded-2xl p-6 border border-beige shadow-sm">
            <p className="text-sage text-sm font-medium">Total Products</p>
            <p className="text-3xl font-poppins font-bold text-forest mt-1">{totalProducts}</p>
          </div>
          <div className="bg-cream rounded-2xl p-6 border border-beige shadow-sm">
            <p className="text-sage text-sm font-medium">Inventory Value</p>
            <p className="text-3xl font-poppins font-bold text-forest mt-1">₹{totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-cream rounded-2xl p-6 border border-beige shadow-sm">
            <p className="text-sage text-sm font-medium">Low Stock Items</p>
            <p className={`text-3xl font-poppins font-bold mt-1 ${lowStock > 0 ? "text-farmPink" : "text-forest"}`}>
              {lowStock}
            </p>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className={`fixed top-24 right-6 z-50 px-6 py-4 rounded-xl shadow-lg font-medium animate-bounce transition-all ${
            toast.type === "success" ? "bg-moss text-cream" : "bg-red-500 text-white"
          }`}>
            {toast.message}
          </div>
        )}

        {/* ─── ADD / EDIT PRODUCT FORM (inline, always visible) ─── */}
        <form
          onSubmit={handleSubmit}
          className="bg-cream p-6 sm:p-8 rounded-2xl shadow-sm max-w-xl mx-auto mb-10 border border-beige"
        >
          <h2 className="text-xl font-poppins font-bold text-forest mb-1 text-center">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-sage text-sm mb-5 text-center">
            {editingProduct ? "Update the product details below." : "Fill in the details to add a new product."}
          </p>

          <label htmlFor="name" className="block text-sm font-medium text-forest mb-1">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g., Monstera Deliciosa"
            className="w-full border border-sage rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="description" className="block text-sm font-medium text-forest mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the product..."
            rows={3}
            className="w-full border border-sage rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-forest bg-white resize-none"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-forest mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="499"
                min="0"
                className="w-full border border-sage rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-forest mb-1">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="10"
                min="0"
                className="w-full border border-sage rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label htmlFor="image" className="block text-sm font-medium text-forest mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="https://example.com/image.jpg"
            className="w-full border border-sage rounded-xl px-4 py-3 mb-1 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
            value={formData.image}
            onChange={handleChange}
          />
          <p className="text-xs text-sage mb-3">Leave empty for placeholder image</p>

          <label htmlFor="category" className="block text-sm font-medium text-forest mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full border border-sage rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={actionLoading}
              className="flex-1 bg-forest text-cream py-3 rounded-xl font-medium hover:bg-moss transition-all disabled:opacity-50 shadow-lg"
            >
              {actionLoading
                ? (editingProduct ? "Updating..." : "Creating...")
                : (editingProduct ? "Update Product" : "Add Product")}
            </button>

            {editingProduct && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-3 rounded-xl font-medium text-forest bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* ─── ALL PRODUCTS, GROUPED BY CATEGORY ─── */}
        <h2 className="text-xl font-poppins font-bold text-forest mb-4">
          All Products ({totalProducts})
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-forest border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-sage">Loading products...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-cream rounded-2xl p-12 text-center border border-beige">
            <p className="text-sage text-lg">No products yet. Add your first one above.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedProducts.map((group) => (
              <div key={group.category}>
                {/* Category section header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${categoryDots[group.category] || "bg-gray-400"}`}></span>
                  <h3 className="font-poppins font-semibold text-forest capitalize">{group.category}</h3>
                  <span className="text-xs text-sage bg-beige/60 px-2 py-0.5 rounded-full">{group.items.length}</span>
                  <div className="flex-1 h-px bg-beige ml-2"></div>
                </div>

                {/* Space-saving compact grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {group.items.map((product) => (
                    <div
                      key={product._id}
                      className="bg-cream rounded-xl border border-beige overflow-hidden shadow-sm hover:shadow-md transition-all group"
                    >
                      {/* Image */}
                      <div className="h-24 bg-blush relative overflow-hidden">
                        <img
                          src={product.image || "https://placehold.co/200x150?text=No+Image"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/200x150?text=No+Image"
                          }}
                        />
                        {product.quantity < 5 && (
                          <span className="absolute top-1.5 right-1.5 bg-farmPink text-cream px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                            Low
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-2.5">
                        <h4 className="font-poppins font-semibold text-forest text-xs truncate" title={product.name}>
                          {product.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm font-poppins font-bold text-forest">₹{product.price}</p>
                          <p className="text-[10px] text-sage">{product.quantity} left</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-1 mt-2">
                          <button
                            onClick={() => openEditModal(product)}
                            disabled={actionLoading}
                            className="flex-1 bg-forest/10 text-forest py-1 rounded-lg font-medium hover:bg-forest hover:text-cream transition-all text-[11px]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            disabled={actionLoading}
                            className="flex-1 bg-red-50 text-red-600 py-1 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-all text-[11px]"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProducts