"use client";

import Link from "next/link";

const Home = () => {
  return (
    <div id="top" className="min-h-screen bg-gray-900 text-gray-100 flex justify-center">
      <div className="container flex flex-col gap-6 p-6 bg-gray-800  shadow-lg">
        <h1 className="lg:text-2xl text-xl text-center text-white font-bold">Conduct historical research to help us write the life stories of these fallen heroes.</h1>
        {/* Intro Paragraph */}
        <p className="text-base leading-relaxed">
        We invite educators, history enthusiasts, military personnel, family members of service members, 
        social justice advocates, and members of the general public to join us in honouring Canadian aircrew 
        members from World War II with no known graves. Together, let's preserve their legacy. 
        </p>

        {/* How to Participate Section */}
        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-2">How You Can Participate:</h2>
          <ul className="space-y-4 text-sm">
            <li>
              <h3 className="font-bold text-lg">1. Select a Name</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><Link href={"/database"} className="underline italic text-blue-300 hover:text-blue-500" >Visit the database.</Link></li>
                <li>Pick a name. The names are organized by province and town.</li>
                <li>Click “select” to register your choice.</li>
              </ul>
            </li>
            <li>
              <h3 className="font-bold text-lg">2. Research</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use our <a
              className="text-blue-500 cursor-pointer hover:text-blue-600 transition-300 italic underline"
              href="/Guide for Conducting Historical Research_April 2025.pdf"
              download="Guide_for_Conducting_Historical_Research_April_2025.pdf"
            >
              PDF Guide for Conducting Historical Research</a></li>
              </ul>
            </li>
            <li>
              <h3 className="font-bold text-lg">3. Write</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use the Report template included in the <Link className="underline italic text-blue-300 hover:text-blue-500"  href={"/research-guide"}>Guide for Conducting Historical Research</Link></li>
              </ul>
            </li>
            <li>
              <h3 className="font-bold text-lg">4. Submit</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Upload your completed report{" "}
                  <a className="underline italic text-blue-300 hover:text-blue-500" href="mailto:researchassistantkim@gmail.com">
                    here.
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Why It Matters Section */}
        <div>
          <h2 className="text-xl font-semibold text-blue-400 mb-2">Why Your Participation Matters:</h2>
          <p className="text-base leading-relaxed pb-2">
          Their life stories are often missing from remembrance. By conducting historical research and writing their life story, you help honour their service and ensure their sacrifices are not forgotten.
          </p>
          <p className="text-base leading-relaxed pb-2">
          Your contribution will also model “equality in death and “obligation of care” for these fallen heroes.
          </p>
          <p className="text-base leading-relaxed pb-2">
          <i>Equality in death</i> means recognizing and honouring every military service member equally—regardless of rank, unit, or the circumstances of their loss.
          </p>
          <p className="text-base leading-relaxed pb-2">
           <i>Obligation of care</i> refers to the enduring social contract between the government, the grieving families of the missing, and the broader public to remember, respect, and care for those who did not return.
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