"use client"
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div id="top" className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="container max-w-4xl flex flex-col gap-6 p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* How to Participate Section */}
        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-2">About Us:</h2>
          <ul className="space-y-4 text-sm">
            <li>
              <h3 className="font-bold text-lg">Joshua Goold</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Computer Programming Student at Humber College</li>
                <li>Designed and built database, built web scraper to compile all the data</li>
                <li>Designed and built this website for all of you</li>
              </ul>
            </li>
            <li>
              <h3 className="font-bold text-lg">Kim Bergeron</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Social Scientist and researcher</li>
                <li>Validated data and did research stuff</li>
                <li>You can write your stuff down kim...</li>
              </ul>
            </li>
            <li>
              <h3 className="font-bold text-lg">Something University</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>I forget the university name so kim could you getv some text</li>
                <li>Funded the research of kim and the development of josh</li>
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
      </div>
    </div>
  )
}

export default page
