import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import Hero from "../components/Hero";
export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (current) navigate("/");
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.dispatchEvent(new Event("userUpdated"));
      navigate("/");
    } else {
      setError("You Don't Have an Account, Please Register");
    }
  };

  return (
    <>
      <Hero
        title={
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-white">
              Login to <span className="text-yellow-500">ANTAJITOS</span>
            </h2>
          </>
        }
        img={login}
      />
      <div className=" flex items-center justify-center bg-gray-100 py-15">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-center text-2xl font-medium">Login</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg border-gray-300"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-yellow-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
