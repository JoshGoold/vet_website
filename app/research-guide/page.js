// app/page.js
"use client";


const Home = () => {
  return (
    <div id="top" className="min-h-screen bg-gray-900 flex justify-center items-center text-gray-100 ">
      <div className="lg:max-w-4xl mx-auto flex justify-center items-center flex-col ">
        <div>
          <p>
            Download our Research Guide PDF{" "}
            <a
              className="text-blue-500 cursor-pointer hover:text-blue-600 transition-300 italic underline"
              href="/Guide for Conducting Historical Research_April 2025.pdf"
              download="Guide_for_Conducting_Historical_Research_April_2025.pdf"
            >
              Download here
            </a>
            .
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
