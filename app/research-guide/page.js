// app/page.js
"use client";


const Home = () => {
  return (
    <div id="top" className="min-h-screen bg-gray-900 p-6 text-gray-100 ">
      <div className="lg:max-w-4xl mx-auto flex justify-center items-center flex-col ">
      <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Research Guide</h1>
        <div>
          <p>
          We invite individuals from all backgrounds—educators, history enthusiasts, military personnel, family members of service members, social justice advocates, and members of the general public to use this guide to conduct historical research to help write the life stories of Canadian aircrew members who served during World War II and have no known grave. Together, we can honour their service and preserve their memory. 
          </p>
          <p className="text-center pt-2">
          Download{" "}
            <a
              className="text-blue-500 cursor-pointer hover:text-blue-600 transition-300 italic underline"
              href="/Guide for Conducting Historical Research_April 2025.pdf"
              download="Guide_for_Conducting_Historical_Research_April_2025.pdf"
            >
              Guide for Conducting Historical Research
            </a>
            .
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
