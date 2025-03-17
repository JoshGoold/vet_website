"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const Portal = () => {
  const searchParams = useSearchParams(); // Get query parameters
  const router = useRouter(); // For navigation
  const [isValid, setIsValid] = useState(false); // Track validation state

  useEffect(() => {
    const storedCode = localStorage.getItem("code"); // Get code from localStorage
    const queryCode = searchParams.get("code"); // Get code from URL query (e.g., ?code=123456)

    if (storedCode && queryCode && storedCode === queryCode) {
      // Codes match, allow access
      setIsValid(true);
    } else {
      // Codes don’t match or are missing, redirect away
      router.push("/"); // Redirect to homepage (or wherever you want)
    }
  }, [searchParams, router]); // Re-run if searchParams or router changes

  // Only render content if the code is valid
  if (!isValid) {
    return null; // Or a loading spinner/message while redirecting
  }

  return (
    <div className="text-center text-4xl text-white">
      Hello
    </div>
  );
};

export default Portal;