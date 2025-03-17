"use client"; // Required for React components in the app/ directory
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "", code: "" });
  const [twoFactor, setTwoFactor] = useState(false);
  const [correctCode, setCorrectCode] = useState("")

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTwoFactor = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (correctCode === formData.code) {
      router.push(`/portal?code=${correctCode}`); 
    } else {
      alert("Code is incorrect");
    }
  };
  const handleAuthentication = async (e) => {
    e.preventDefault();
    try {
          if (!formData.email || formData.password.length < 6) {
              alert("Please provide a valid email and password with at least 6 characters.");
              return;
          }
  
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validate email format
          if (!emailRegex.test(formData.email)) {
              alert("Please enter a valid email.");
              return;
          }
          const response = await fetch("/api/autherize", {method: "POST", body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }), headers: {"Content-Type": "application/json"}})
          const data = await response.json()
          if(data.Success){
            setCorrectCode(data.Code)
            setTwoFactor(true)
          } else{
            alert(data.Message)
          }


    } catch (error) {
      console.error("Error occured while authenticating: ", error)
    }
  }

  return (
    <section className="h-full dark-bg">
      <div className="blocks relative">
        <a className="absolute top-3 color-background section-marker left-3">Viacore Software</a>
        <a href="/" className="absolute top-3 color-background section-marker right-3 hover:underline cursor-pointer">← Go Home</a>
        {!twoFactor ? (
        <div className="flex flex-col foreground h-screen justify-center items-center">
          <h1 className="large-title-background">Admin Portal</h1>
          <form onSubmit={handleAuthentication} className="flex flex-col gap-1 lg:w-1/2 w-3/4 items-center justify-center">
            <input
            className="p-3 w-full"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your organization's email"
            />
            <input
            className="p-3 w-full"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <input title="Submit" className="background w-full p-3 hover:bg-neutral-300 transition-300" type="submit" value={"Log In"} />
          </form>
          <a title="New Password" className="text-sm color-background hover:underline pt-10" href="#">Forgot your password?</a>
        </div>
        ): (
          <div className="flex flex-col foreground h-screen justify-center items-center">
          <h1 className="large-title-background">Enter Code</h1>
          <p className="small-title-background">Please enter the code to your email.</p>
          <form onSubmit={handleTwoFactor} className="flex flex-col gap-1 w-1/2 items-center justify-center">
            <input
            className="p-3 w-full"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter your two factor authentication code"
            />
            <input title="Submit" className="background w-full p-3 hover:bg-neutral-300 transition-300" type="submit" value={"Log In"} />
          </form>
          <a title="New Password" className="text-sm color-background hover:underline pt-10" href="#">Forgot your password?</a>
        </div>
        )}
      </div>
    </section>
  );
}
