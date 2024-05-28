import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:3000/auth/reset-password/${token}`, { password })
      .then((response) => {
        if (response.data.status) {
          navigate('/login');
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">New Password:</label>
          <input
            type="password"
            id="password"
            placeholder="******"
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
