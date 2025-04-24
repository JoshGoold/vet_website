"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import logVisit from "@/utils/logVisit";

const LessonPlans = () => {
  const [lessonPlans, setLessonPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessonPlans = async () => {
      try {
        const response = await fetch("https://veteran-api-for-kim.vercel.app/get-lessons", {method: "GET"}); // Adjust URL as needed
        const data = await response.json();
        if(data.Success){
            setLessonPlans(data.Lessons);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLessonPlans();
  }, []);

  useEffect(() => {
    logVisit("/lesson-plans");
  }, []);


  if (loading) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900  p-6">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Lesson Plans</h1>
        {lessonPlans.length === 0 ? (
          <p className="text-lg text-gray-400 text-center">
            No lesson plans are available yet. Check back soon for educational resources!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {lessonPlans.map((plan) => (
              <div
                key={plan._id}
                className="bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
              >
                {plan.img && (
                  <Image
                    src={`data:image/jpeg;base64,${Buffer.from(plan.img).toString("base64")}`}
                    alt={plan.summary}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold text-white mb-2">{plan.summary}</h2>
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Lesson Plan
                </a>
                <p className="text-gray-400 text-sm mt-2">
                  Created: {new Date(plan.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPlans;