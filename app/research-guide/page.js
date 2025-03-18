// app/page.js
"use client";

import Link from "next/link";

const Home = () => {
 return (
 <div id="top" className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6">
 <div className="container max-w-4xl mx-auto flex flex-col gap-6">
 {/* Hero Section */}
 <div className="text-center bg-gray-800 rounded-lg shadow-lg p-6">
 <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
 Honor Canada’s WWII Aircrew
 </h1>
 <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
 Join teachers, history enthusiasts, military personnel, families, and advocates in preserving the legacy of Canadian aircrew members from World War II with no known graves.
 </p>
 <Link
 href="/portal"
 className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
 >
 Get Started
 </Link>
 </div>

 {/* How to Participate Section */}
 <div className="bg-gray-800 rounded-lg shadow-lg p-6">
 <h2 className="text-xl sm:text-2xl font-semibold text-blue-400 mb-4">How to Participate</h2>
 <ul className="space-y-6 text-sm sm:text-base">
 <li>
 <h3 className="font-bold text-lg text-white">1. Select a Name</h3>
 <ul className="list-disc pl-5 space-y-1 text-gray-300">
 <li>Explore our WWII Canadian Aircrew Database, organized by province and town.</li>
 <li>Pick an aircrew member from your area to research.</li>
 <li>Click “select” to register your choice.</li>
 </ul>
 </li>
 <li>
 <h3 className="font-bold text-lg text-white">2. Research</h3>
 <ul className="list-disc pl-5 space-y-1 text-gray-300">
 <li>Use our Historical Research Instructions and Resources below.</li>
 </ul>
 </li>
 <li>
 <h3 className="font-bold text-lg text-white">3. Write</h3>
 <ul className="list-disc pl-5 space-y-1 text-gray-300">
 <li>Follow the Historical Research Report Template.</li>
 </ul>
 </li>
 <li>
 <h3 className="font-bold text-lg text-white">4. Submit</h3>
 <ul className="list-disc pl-5 space-y-1 text-gray-300">
 <li>
 <Link className="underline italic text-blue-300 hover:text-blue-500" href="/submit">
 Click here to submit
 </Link>
 </li>
 </ul>
 </li>
 </ul>
 </div>

 {/* Research Instructions Section */}
 <div className="bg-gray-800 rounded-lg shadow-lg p-6">
 <h2 className="text-xl sm:text-2xl font-semibold text-blue-400 mb-4">How to Conduct Historical Research</h2>
 <div className="space-y-6">
 {/* Instructions */}
 <div>
 <h3 className="text-lg font-semibold text-white mb-2">Instructions</h3>
 <ol className="list-decimal pl-5 space-y-4 text-gray-300 text-sm sm:text-base">
 <li>
 <strong className="text-white">Conduct Your Research</strong>
 <div className="mt-1">
 Use the provided sources and links to gather historical information. Feel free to explore additional credible sources to support your findings.
 </div>
 </li>
 <li>
 <strong className="text-white">Maintain a Personal Research Journal</strong>
 <div className="mt-1">
 Keep a record of your process, including:
 <ul className="list-disc pl-5 mt-1 space-y-1">
 <li>What you do (steps taken, sources explored).</li>
 <li>What you find (key discoveries, important details).</li>
 <li>Your thoughts or ideas for next steps.</li>
 </ul>
 <div className="mt-1">
 Use the research report template sections to organize and document findings. Include full citations (e.g., source name, URL).
 </div>
 </div>
 </li>
 <li>
 <strong className="text-white">Write and Submit a Historical Research Report</strong>
 <div className="mt-1">
 Use the provided template, save as a Word document, and submit via email to{" "}
 <a href="mailto:[Insert Email Here]" className="text-blue-300 hover:text-blue-500">[Insert Email Here]</a>.
 </div>
 </li>
 <li>
 <strong className="text-white">Review and Publication</strong>
 <div className="mt-1">
 A reviewer from the WWII Canadian Aircrew Database will verify your information. Once confirmed, a summary will be posted online, with your name credited (with permission).
 </div>
 </li>
 </ol>
 </div>

 {/* Steps */}
 <div>
 <h3 className="text-lg font-semibold text-white mb-2">Steps for Conducting the Research</h3>
 <ol className="list-decimal pl-5 space-y-4 text-gray-300 text-sm sm:text-base">
 <li>
 <strong className="text-white">Use Preliminary Information</strong>
 <div className="mt-1">
 Start with database details: Full Name, Place of Birth/Hometown, Squadron Number/Name, Branch: Royal Canadian Air Force.
 </div>
 </li>
 <li>
 <strong className="text-white">Consult the Canadian Virtual War Memorial (CVWM)</strong>
 <div className="mt-1">
 Visit the{" "}
 <a href="https://www.veterans.gc.ca/eng/remembrance/memorials/canadian-virtual-war-memorial" className="text-blue-300 hover:text-blue-500">
 CVWM website
 </a>
 , search by name, and review:
 <ul className="list-disc pl-5 mt-1 space-y-1">
 <li>Full name, service number, rank, unit</li>
 <li>Date of death, cemetery/memorial location</li>
 <li>Biographical details, possibly photographs</li>
 </ul>
 </div>
 </li>
 <li>
 <strong className="text-white">Access Service Files (Library and Archives Canada)</strong>
 <div className="mt-1">
 Search the{" "}
 <a href="https://www.bac-lac.gc.ca/eng/discover/military-heritage/second-world-war/second-world-war-dead-1939-1947/Pages/files-second-world-war-dead.aspx" className="text-blue-300 hover:text-blue-500">
 LAC database
 </a>{" "}
 for:
 <ul className="list-disc pl-5 mt-1 space-y-1">
 <li>Enlistment, military, medical records</li>
 <li>Circumstances of death</li>
 </ul>
 <div className="mt-1">Some files are online; request others from LAC.</div>
 </div>
 </li>
 <li>
 <strong className="text-white">Explore the Commonwealth War Graves Commission (CWGC)</strong>
 <div className="mt-1">
 Use the{" "}
 <a href="https://www.cwgc.org" className="text-blue-300 hover:text-blue-500">
 CWGC "Find War Dead" tool
 </a>{" "}
 to find:
 <ul className="list-disc pl-5 mt-1 space-y-1">
 <li>Service number, rank, regiment</li>
 <li>Date of death, cemetery/memorial details</li>
 </ul>
 </div>
 </li>
 <li>
 <strong className="text-white">Consult the Books of Remembrance</strong>
 <div className="mt-1">
 Search the{" "}
 <a href="https://www.veterans.gc.ca/eng/remembrance/memorials/books" className="text-blue-300 hover:text-blue-500">
 Books of Remembrance
 </a>{" "}
 for:
 <ul className="list-disc pl-5 mt-1 space-y-1">
 <li>Name, rank, unit, date of death</li>
 </ul>
 </div>
 </li>
 <li>
 <strong className="text-white">Utilize Additional Resources</strong>
 <div className="mt-1">
 Explore:
 <ul className="list-disc pl-5 mt-1 space-y-1">
 <li>Military Medals, Honours, and Awards</li>
 <li>Local archives, museums (letters, photos)</li>
 <li>
 Genealogical sites like{" "}
 <a href="https://www.ancestry.ca" className="text-blue-300 hover:text-blue-500">
 Ancestry.ca
 </a>{" "}
 (fees may apply)
 </li>
 </ul>
 </div>
 </li>
 </ol>
 </div>
 </div>
 </div>

 {/* Why It Matters Section */}
 <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
 <h2 className="text-xl sm:text-2xl font-semibold text-blue-400 mb-4">Why Your Participation Matters</h2>
 <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
 Our database lists 3,749 Canadian aircrew members from WWII with no known graves. Their stories risk being lost to time. Your research ensures their sacrifices are remembered and honored.
 </p>
 </div>
 </div>
 </div>
 );
};

export default Home;