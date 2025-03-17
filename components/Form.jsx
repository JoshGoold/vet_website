"use client";
import React, { useState } from "react";

const Form = ({ veteran, province, city, setState, groupData}) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!province || !city || !veteran) {
      return alert("Please refresh your page and try again.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (formData.name.length < 3) {
      return alert("Please enter a valid name.");
    }
    if (!emailRegex.test(formData.email)) {
      return alert("Please enter a valid email.");
    }

    try {
      const response = await fetch("https://veteran-api-for-kim.vercel.app/select", {
        method: "POST",
        body: JSON.stringify({
          province,
          city,
          vet_id: veteran._id,
          name: formData.name,
          email: formData.email,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
        console.log(data)
      if (!data.Success) {
        return alert(data.Message);
      }

      alert(data.Message);
      groupData[province][city][veteran.index].taken = true;
      setState(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
  <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-xl w-full max-w-md">
    <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">
      Confirm Your Research Topic
    </h1>
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div className="border border-gray-600 p-3 rounded-md bg-gray-700 shadow-md">
        <h2 className="underline text-lg font-semibold">You've Selected</h2>
        <p className="mt-2">
          {veteran.name.substring(0, veteran.name.length - 1).split(",")[1]}{" "}
          {veteran.name.substring(0, veteran.name.length - 1).split(",")[0]}
        </p>
        <p>
          {city}, {province}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">Full Name</h2>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter name here"
          required
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">Email Address</h2>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Enter email here"
          required
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md w-full font-medium transition-colors duration-200"
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={() => setState(false)}
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md w-full font-medium transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default Form;
