"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Main Portal component
const PortalContent = () => {
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
      router.push("/"); // Redirect to homepage
    }
  }, [searchParams, router]); // Re-run if searchParams or router changes

  if (!isValid) {
    return null; // Or a loading spinner/message while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="text-center text-4xl text-white">Hello</div>
    </div>
  );
};

// Wrapper component with Suspense
const Portal = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400">Loading...</div>}>
      <PortalContent />
    </Suspense>
  );
};

export default Portal;