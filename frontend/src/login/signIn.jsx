import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import { loginSuccess } from "@/features/user/userSlice"

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      })

      if (res.data.success && res.data.token) {
        dispatch(
          loginSuccess({
            user: res.data.user,
            token: res.data.token,
          })
        )

        const role = res.data.user?.role
        if (role === "admin") {
          navigate("/admin", { replace: true })
        } else {
          navigate(from, { replace: true })
        }
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-cream/95 backdrop-blur-md rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-logo text-center text-forest mb-2">Fresh Farm</h1>
        <p className="text-center text-gray-600 mb-8">Welcome Back 🌿</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <label className="block mb-2 font-medium text-charcoal">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-5 border border-sage rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium text-charcoal">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full mb-6 border border-sage rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-forest text-white py-3 rounded-xl hover:bg-moss transition disabled:opacity-70"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <p className="text-center mt-8 text-gray-600">
          Don't have an account?
        </p>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full mt-3 bg-farmPink text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignIn