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
      const response = await fetch("http://localhost:3900/select", {
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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white text-black p-6 shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-5 text-center">
          Confirm Your Research Topic
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="border p-2 border-black shadow-md mb-5">
            <h2 className="underline">You've Selected</h2>
            <p>
              {veteran.name.substring(0, veteran.name.length - 1).split(",")[1]}{" "}
              {veteran.name.substring(0, veteran.name.length - 1).split(",")[0]}
            </p>
            <p>
              {city}, {province}
            </p>
          </div>

          <div className="mb-5">
            <h2>Enter your Full Name</h2>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-black w-full p-2 rounded-md"
              type="text"
              placeholder="Enter name here"
              required
            />
          </div>

          <div className="mb-5">
            <h2>Enter your Email Address</h2>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-black w-full p-2 rounded-md"
              type="email"
              placeholder="Enter email here"
              required
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="bg-green-500 p-2 rounded-md text-white w-full">
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setState(false)}
              className="bg-red-500 p-2 rounded-md text-white w-full"
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
