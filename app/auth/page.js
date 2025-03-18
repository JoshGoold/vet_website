"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function Admin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", code: "" });
  const [twoFactor, setTwoFactor] = useState(false);
  const [correctCode, setCorrectCode] = useState("");
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTwoFactor = (e) => {
    e.preventDefault();
    if (correctCode === formData.code) {
      localStorage.setItem("code", correctCode);
      router.push(`/portal?code=${correctCode}`);
    } else {
      alert("Code is incorrect");
    }
  };

  const handleAuthentication = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      if (!formData.email || formData.password.length < 6) {
        alert("Please provide a valid email and password with at least 6 characters.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email.");
        return;
      }

      const response = await fetch("/api/autherize", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.Success) {
        setCorrectCode(data.Code);
        setTwoFactor(true);
      } else {
        alert(data.Message);
      }
    } catch (error) {
      console.error("Error occurred while authenticating: ", error);
    } finally{
      setLoading(false)
    }
  };

  if(loading) return <Loader/>

  return (
    <section className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg">

        <a
          href="/"
          className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          ← Go Home
        </a>

        {/* Form Container */}
        {!twoFactor ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <h1 className="text-3xl font-bold text-blue-400 mb-6">Admin Portal</h1>
            <form
              onSubmit={handleAuthentication}
              className="flex flex-col gap-4 w-full bg-gray-800 p-6 rounded-lg shadow-xl"
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Organization Email"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200"
              >
                Log In
              </button>
            </form>
            <a
              href="#"
              className="text-sm text-blue-400 hover:underline mt-4"
            >
              Forgot your password?
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16">
            <h1 className="text-3xl font-bold text-blue-400 mb-4">Enter Code</h1>
            <p className="text-sm text-gray-400 mb-6">Check your email for the code.</p>
            <form
              onSubmit={handleTwoFactor}
              className="flex flex-col gap-4 w-full bg-gray-800 p-6 rounded-lg shadow-xl"
            >
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Two-Factor Code"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200"
              >
                Log In
              </button>
            </form>
            <a
              href="#"
              className="text-sm text-blue-400 hover:underline mt-4"
            >
              Forgot your password?
            </a>
          </div>
        )}
      </div>
    </section>
  );
}