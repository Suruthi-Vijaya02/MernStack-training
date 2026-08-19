import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import { loginSuccess } from "@/features/user/userSlice"

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (user.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      // role is hardcoded to "user" — no admin selection on frontend
      const res = await axios.post("http://localhost:3000/users/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        role: "user", // ← HARDCODED: only customers can sign up here
      })

      if (res.data.success && res.data.token) {
        dispatch(
          loginSuccess({
            user: res.data.user,
            token: res.data.token,
          })
        )
        navigate("/", { replace: true })
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Registration failed. Please try again.")
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
        className="relative z-10 w-full max-w-lg bg-cream/95 backdrop-blur-md rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-4xl text-center text-forest font-logo mb-2">Fresh Farm</h1>
        <p className="text-center text-gray-600 mb-8">Create your account</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <label className="block mb-2 font-medium text-forest">Full Name</label>
        <input
          name="name"
          placeholder="Enter your name"
          className="w-full border border-sage rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-forest"
          value={user.name}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-medium text-forest">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full border border-sage rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-forest"
          value={user.email}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-medium text-forest">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create password (min 6 chars)"
          className="w-full border border-sage rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-forest"
          value={user.password}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-medium text-forest">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="w-full border border-sage rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-forest"
          value={user.confirmPassword}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-forest text-white py-3 rounded-xl hover:bg-moss transition disabled:opacity-70 font-medium"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="text-farmPink font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp