import React, { useState } from "react";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      console.log('Login response:', response.data);

      if (response.data.status) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        console.log('Token stored in localStorage:', response.data.token);

        // Navigate to chat page
        navigate("/chat", { replace: true });
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-4xl w-full mx-auto flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left side - Login Form */}
        <div className="lg:w-1/2 p-8">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:ring-black focus:border-black"
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="******"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:ring-black focus:border-black"
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="flex justify-between items-center">
              <Link to="/forgotPassword" className="text-blue-500">
                Forgot Password?
              </Link>
              <p className="ml-4">
                Don't Have an Account?{" "}
                <Link to="/signup" className="text-blue-500">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/college-university-students-group-young-happy-people-standing-isolated-white-background_575670-66.jpg?ga=GA1.1.914380807.1723369038&semt=ais_hybrid"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
