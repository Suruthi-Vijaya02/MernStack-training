import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(user);

    // alert("Sign Up UI Only");
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
        className="relative z-10 w-full max-w-lg bg-cream/95 backdrop-blur-md rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-4xl text-center text-forest font-logo mb-2">
          Fresh Farm
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Connect with nature
        </p>

        <label className="block mb-2 font-medium">
          Full Name
        </label>

        <input
          name="name"
          placeholder="Enter your name"
          className="w-full border border-sage rounded-xl px-4 py-3 mb-5"
          value={user.name}
          onChange={handleChange}
        />

        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full border border-sage rounded-xl px-4 py-3 mb-5"
          value={user.email}
          onChange={handleChange}
        />

        <label className="block mb-2 font-medium">
          Password
        </label>

        <input
          type="password"
          name="password"
          placeholder="Create password"
          className="w-full border border-sage rounded-xl px-4 py-3 mb-5"
          value={user.password}
          onChange={handleChange}
        />

        <label className="block mb-2 font-medium">
          Confirm Password
        </label>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="w-full border border-sage rounded-xl px-4 py-3 mb-6"
          value={user.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-forest text-white py-3 rounded-xl hover:bg-moss transition"
        >
          Create Account
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
          Already have an account?
        </p>

        <button
          type="button"
          onClick={() => navigate("/signin")}
          className="w-full mt-3 bg-farmPink text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignUp;