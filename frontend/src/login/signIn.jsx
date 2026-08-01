import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    // alert("Sign In UI Only");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-cream/95 backdrop-blur-md rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-logo text-center text-forest mb-2">
          Fresh Farm
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Welcome Back 🌿
        </p>

        <label className="block mb-2 font-medium text-charcoal">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-5 border border-sage rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 font-medium text-charcoal">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full mb-6 border border-sage rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-forest text-white py-3 rounded-xl hover:bg-moss transition"
        >
          Sign In
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          type="button"
          className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

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
  );
};

export default SignIn;