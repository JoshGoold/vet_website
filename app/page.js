"use client";

import Link from "next/link";

const Home = () => {
  return (
    <div id="top" className="min-h-screen bg-gray-900 text-gray-100 flex justify-center">
      <div className="container max-w-4xl flex flex-col gap-6 p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* Intro Paragraph */}
        <p className="text-base leading-relaxed">
          We invite teachers, history enthusiasts, military personnel, families of service members, 
          social justice advocates, and the public to join us in honoring Canadian aircrew members 
          from World War II with no known graves. Together, let’s preserve their legacy.
        </p>

        {/* How to Participate Section */}
        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-2">How You Can Participate:</h2>
          <ul className="space-y-4 text-sm">
            <li>
              <h3 className="font-bold text-lg">1. Select a Name</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Explore our WWII Canadian Aircrew Database (below), organized by province and town.</li>
                <li>Pick an aircrew member from your area to research.</li>
                <li>Click “select” to register your choice.</li>
              </ul>
            </li>
            <li>
              <h3 className="font-bold text-lg">2. Research</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use our Historical Research Instructions and Resources.</li>
              </ul>
            </li>
            <li>
              <h3 className="font-bold text-lg">3. Write</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Follow the Historical Research Report Template.</li>
              </ul>
            </li>
            <li>
              <h3 className="font-bold text-lg">4. Submit</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <Link className="underline italic text-blue-300 hover:text-blue-500" href="/submit">
                    Click here to submit
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Why It Matters Section */}
        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-2">Why Your Participation Matters:</h2>
          <p className="text-base leading-relaxed">
            Our database lists 3,749 Canadian aircrew members from WWII with no known graves. 
            Their stories are often lost to time. Your research and writing ensure their sacrifices endure.
          </p>
        </div>

        {/* Database Link */}
        <Link 
          className="block text-center bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-md font-medium transition-colors duration-200" 
          href="/database"
        >
          Access the Database
        </Link>
      </div>
    </div>
  );
};

export default Home;