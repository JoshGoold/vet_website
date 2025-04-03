// app/page.js
"use client";

import Image from "next/image";
import Link from "next/link";

import img from "../../assets/pen-paper.webp";
import canada_flag from "../../assets/canada-flag.png";

const Home = () => {
  return (
    <div id="top" className="min-h-screen bg-gray-900 text-gray-100 ">
      <div className="lg:max-w-4xl mx-auto flex flex-col ">
        <div>
          <p>
            Download PDF if you prefer this method{" "}
            <a
              className="text-blue-500 cursor-pointer hover:text-blue-600 transition-300 italic underline"
              href="/Guide for Conducting Historical Research_April 2025.pdf"
              download="Guide_for_Conducting_Historical_Research_April_2025.pdf"
            >
              Download PDF
            </a>
            .
          </p>
        </div>
        {/* Hero Section */}
        <div className="text-center bg-gray-800  shadow-lg p-10 img-div">
          <h1 className="lg:text-2xl  sm:text-2xl font-bold text-white mb-2">
            A Guide for Conducting Historical Research:
          </h1>
          <h1 className="lg:text-2xl  font-bold text-white mb-2">
            WWII Aircrew with No Known Graves
          </h1>
          <p className="text-sm  lg:ml-[200px] text-gray-400 leading-relaxed">
            Developed by Dr. Kim Bergeron
          </p>
          <p className="lg:ml-[350px] text-xs">April 2025</p>
        </div>
        <div className="bg-white p-5">
          {/* How to Participate Section */}
          <div className=" p-6">
            <h2 className="text-xl py-5 w-full px-2 bg-gray-800  sm:text-2xl font-semibold text-white mb-4">
              Who Should Use This Guide?
            </h2>
            <p className="text-black p-2">
              We invite individuals from all walks of life—teachers, history
              enthusiasts, military personnel, family members of service
              members, advocates for social justice, and the general public can
              use this guide to conduct historical research to help write the
              life stories of Canadian aircrew members who served during World
              War II and have no known grave. Together, we can honour their
              service and preserve their memory.
            </p>
          </div>
          <div className=" p-6">
            <h2 className="text-xl py-5 w-full px-2 bg-gray-800  sm:text-2xl font-semibold text-white mb-4">
              Why Your Participation Matters
            </h2>
            <p className="text-black p-2">
              There are 3,749 Canadian aircrew members from WWII who have no
              known graves. Often, their life stories are missing from
              remembrance. By conducting historical research and writing their
              life story, you help honor their service and ensure their
              sacrifices are not forgotten.
            </p>
          </div>
          <div className=" p-6">
            <h2 className="text-xl py-5 w-full px-2 bg-gray-800 sm:text-2xl font-semibold text-white mb-4">
              Start a Personal Research Journal
            </h2>
            <div className="flex lg:flex-row flex-col items-center">
              <ul className="list-disc lg:max-w-[50%] w-full px-6">
                <li className="text-black p-2">
                  Keep a record of your research process, what is found, and
                  from what source of information.
                  <br></br>
                  <ul className="text-black list-disc  pl-10">
                    <li>What did you do (steps taken, sources explored)?</li>
                    <li>
                      What you found (key discoveries, important details).
                    </li>
                    <li>What are your thoughts or ideas for the next steps?</li>
                  </ul>
                </li>
              </ul>
              <div className="lg:max-w-[50%] w-full">
                <Image
                  alt="pen and paper"
                  src={img}
                  className="max-w-full h-[200px] object-cover"
                />
              </div>
            </div>
          </div>

          <div className=" p-6">
            <h2 className="text-xl py-5 w-full px-2 bg-gray-800  sm:text-2xl font-semibold text-white mb-4">
              Conduct the Research
            </h2>
            <p className="text-black py-2">
              These are the recommended steps for conducting historical research
              on service personnel from WWII with no known grave. The intention
              is to collect as much information as possible to tell the stories
              of these fallen heroes and remind us of the human cost of war.
              Some resources are specific for researching Royal Canadian Air
              Force members (aircrew).
            </p>
            <h2 className="text-gray-800 text-xl w-full font-bold py-5">
              Step 1: Pick a name from the WWII Canadian MIA Aircrew Database
            </h2>
            <div className="border border-black p-2">
              <p className="text-black">
                The{" "}
                <Link
                  className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                  href={"/database"}
                >
                  WWII Canadian MIA Aircrew Database
                </Link>{" "}
                is an online database maintained by Dr. Kim Bergeron on behalf
                of the Acadia University Recovery Program. This program focuses
                on developing and implementing an active recovery program in
                Canada that includes conducting historical and investigative
                research and contributing to the recovery, identification and
                repatriation/commemoration of missing-in-action (MIA) military
                service personnel from WWII.
              </p>
              <ul className="list-disc px-6 py-2">
                <li className="text-black p-2">
                  <b>How To Use:</b>
                  <br />
                  <ul className="text-black list-disc  pl-10">
                    <li>Visit the database.</li>
                    <li>
                      Pick a name. The names are organized by province and town.
                    </li>
                    <li>Click "Select" to register your choice.</li>
                  </ul>
                </li>
              </ul>
              <ul className="list-disc px-6 pb-2">
                <li className="text-black p-2">
                  <b>Information Available:</b>
                  <br />
                  <ul className="text-black list-disc  pl-10">
                    <li>Full name and service number.</li>
                    <li>Rank and unit.</li>
                    <li>Home town and province.</li>
                    <li>Date of death and flight details.</li>
                    <li>Memorial location.</li>
                  </ul>
                </li>
              </ul>
            </div>
            <h2 className="text-gray-800 text-xl w-full font-bold py-5">
              Step 2: Consult the Canadian Virtual War Memorial (CVWM)
            </h2>
            <div className="border border-black p-2">
              <p className="text-black">
                The{" "}
                <Link
                  className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                  href={
                    "https://www.veterans.gc.ca/en/remembrance/memorials/canadian-virtual-war-memorial"
                  }
                >
                  CVWM
                </Link>{" "}
                is an online registry maintained by Veterans Affairs Canada. It
                commemorates Canadians and Newfoundlanders who served and gave
                their lives during the World Wars.
              </p>
              <ul className="list-disc px-6 py-2">
                <li className="text-black p-2">
                  <b>How To Use:</b>
                  <br />
                  <ul className="text-black list-disc  pl-10">
                    <li>Visit the CVWM website.</li>
                    <li>
                      Enter the service member's name in the search field.
                    </li>
                    <li>Review the search results for matching records.</li>
                  </ul>
                </li>
              </ul>
              <ul className="list-disc px-6 pb-2">
                <li className="text-black p-2">
                  <b>Information Available:</b>
                  <br />
                  <ul className="text-black list-disc  pl-10">
                    <li>Full name and service number.</li>
                    <li>Rank and unit.</li>
                    <li>Date of death.</li>
                    <li>Cemetery or memorial location.</li>
                    <li>Biographical details and possibly photographs.</li>
                  </ul>
                </li>
              </ul>
            </div>
            <h2 className="text-gray-800 text-xl w-full font-bold py-5">
              Step 3: Access Service Files of the Second Worl War - War Dead,
              1939-1947
            </h2>
            <div className="border border-black p-2">
              <p className="text-black">
                Library and Archives Canada (LAC) maintains the{" "}
                <Link
                  className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                  href={
                    "https://www.bac-lac.gc.ca/eng/discover/military-heritage/second-world-war/second-world-war-dead-1939-1947/Pages/files-second-war-dead.aspx"
                  }
                >
                  Service Files of the Second World War – War Dead, 1939– 1947
                </Link>{" "}
                database, which contains records of individuals who died during
                or shortly after the war. Here is a resource that may help{" "}
                <Link
                  className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                  href={
                    "https://canadiansatarms.ca/researching-canadian-military-who-died-during-ww2/"
                  }
                >
                  Researching Canadian Military who died during WW2 - Canadians
                  At Arms
                </Link>
              </p>
              <ul className="list-disc px-6 py-2">
                <li className="text-black p-2">
                  <b>How To Access:</b>
                  <br />
                  <ul className="text-black list-disc  pl-10">
                    <li>
                      Search the database by entering the individual's name.
                    </li>
                    <li>
                      Review the search results to locate the correct file.
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="list-disc px-6 pb-2">
                <li className="text-black p-2">
                  <b>Information Available:</b>
                  <br />
                  <ul className="text-black list-disc  pl-10">
                    <li>Enlistment details</li>
                    <li>Military service records</li>
                    <li>Medical records</li>
                    <li>Circumstances of death</li>
                  </ul>
                </li>
              </ul>
              <ul className="list-disc px-6 pb-2">
                <li className="text-black p-2">
                  <b>Accessing Files:</b>
                  <br />
                  <ul className="text-black list-disc  pl-10">
                    <li>Some files are digitized and accessible online.</li>
                    <li>
                      For non-digitized files, you can request copies from LAC.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <h2 className="text-gray-800 text-xl w-full font-bold py-5">
              Step 4: Explore the Commonwealth War Graves Commission (CWGC)
              Database
            </h2>
            <div className="border border-black p-2">
              <p className="text-black">
                The{" "}
                <Link
                  className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                  href={"https://www.cwgc.org/"}
                >
                  CWGC
                </Link>{" "}
                commemorates Commonwealth military personnel who died during the
                World Wars
              </p>
              <ul className="list-disc px-6 py-2">
                <li className="text-black p-2">
                  <b>How To Use:</b>
                  <br />
                  <ul className="text-black list-disc  pl-10">
                    <li>Visit the CWGC website.</li>
                    <li>
                      Enter the service member's name in the "Find War Dead"
                      search tool.Filter results by nationality, regiment, or
                      unit if necessary.
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="list-disc px-6 pb-2">
                <li className="text-black p-2">
                  <b>Information Available:</b>
                  <br />
                  <ul className="text-black list-disc  pl-10">
                    <li>Service number.</li>
                    <li>Rank and regiment.</li>
                    <li>Date of death.</li>
                    <li>Cemetery or memorial location.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <h2 className="text-gray-800 text-xl w-full font-bold py-5">
              Step 5: Consult the Books of Remembrance
            </h2>
            <div className="border border-black p-2">
              <p className="text-black">
                Canada's{" "}
                <Link
                  className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                  href={
                    "https://www.veterans.gc.ca/en/remembrance/memorials/books"
                  }
                >
                  CWGC
                </Link>{" "}
                commemorate Canadians who have died in military service.
              </p>
              <ul className="list-disc px-6 py-2">
                <li className="text-black p-2">
                  <b>How To Access:</b>
                  <br />
                  <ul className="text-black list-disc  pl-10">
                    <li>Visit the Books of Remembrance website.</li>
                    <li>
                      Search for the individual's name within the appropriate
                      book
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="list-disc px-6 pb-2">
                <li className="text-black p-2">
                  <b>Information Available:</b>
                  <br />
                  <ul className="text-black list-disc  pl-10">
                    <li>Name and rank.</li>
                    <li>Unit.</li>
                    <li>Date of death.</li>
                  </ul>
                </li>
              </ul>
            </div>
            <h2 className="text-gray-800 text-xl w-full font-bold py-5">
              Step 6: Utilize these Additional Resources
            </h2>
            <div className="border border-black p-2">
              <ul className="list-disc px-6 py-2">
                <li className="text-black p-2">
                  <b>Military Medals, Honours, and Awards:</b> Search for any
                  awards the individual may have received.
                </li>
                <li className="text-black p-2">
                  <b>Local Archives and Museums:</b> Explore regional historical
                  societies or museums for personal letters, photographs, or
                  community records.
                </li>
                <li className="text-black p-2">
                  <b>Genealogical Websites:</b> Platforms like Ancestry.ca or
                  <Link
                    className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                    href={"https://ca.forceswarrecords.com/"}
                  >
                    Forces War Records - Historical military records - Forces
                    War Records
                  </Link>{" "}
                  may have relevant military records or family histories.
                  However, there may be a fee to access the results.
                </li>
                <li className="text-black p-2">
                  <b>War Diaries- Second World War:</b> Use this guide to
                  identify relevant war diaries that may include information
                  about the administration and operations of the mission or
                  unit. They generally do not contain information about
                  individual personnel. Available from{" "}
                  <Link
                    className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                    href={
                      "https://www.crkn-rcdr.ca/en/reference-guide-war-diaries-second-world-war"
                    }
                  >
                    www.crkn-rcdr.ca/en/reference-guide-war-diaries-second-world-war
                  </Link>
                  . The diaries are on microfilm, so you must visit Ottawa to
                  look at them. However, you can request that they be sent to
                  your local library, and you can review them there if they have
                  a microfilm reader.
                </li>
                <li className="text-black p-2">
                  <b>Newspapers:</b> Search newspaper archives. Library and
                  Archives Canada offers a guide{" "}
                  <Link
                    className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                    href={
                      "https://library-archives.canada.ca/eng/collection/research-help/newspaper-collection/Pages/newspaper-guide.aspx"
                    }
                  >
                    Finding newspapers
                  </Link>
                </li>
                <li className="text-black p-2">
                  <b>Books about the Second World War:</b> Numerous books have
                  been written about the different battles during the war (e.g.,
                  Christie, C.A. & Hatch, F. (1995). Ocean Bridge: The History
                  of RAF Ferry Command. University of Toronto Press.
                  <Link
                    className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                    href={"https://doi.org/10.3138/9781442677982"}
                  >
                    https://doi.org/10.3138/9781442677982
                  </Link>
                  ), as well as remembrance books (e.g., Allison, Les, et al.
                  (1992). They Shall Grow Not Old: A Book of Remembrance.
                  Commonwealth Air Training Plan Museum). Consider searching for
                  a book on the name of the battle or the location of where the
                  person died. Some books are available online or at your local
                  library via interlibrary loan. Here is a link to a remembrance
                  book that may offer more information if your person's
                </li>
                <li className="text-black p-2">
                  <b>Daily Routine Orders:</b> These were posted daily for
                  personnel to read so they knew what was happening and what
                  they were supposed to do. There are two parts: Part 1 is
                  administrative, outlining details for the day and who does
                  what, and Part 2 focuses on personnel- first officers and then
                  aircrew outlining movements of personnel (who is arriving and
                  from where or leaving and where they are assigned to along
                  with other personnel information. An Access to Information and
                  Privacy form needs to be filled out. To learn more, visit
                  <Link
                    className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                    href={"https://rcaf.info/"}
                  >
                    RCAF.Info
                  </Link>
                  .
                </li>
              </ul>
              <h3 className="text-xl font-bold p-2 text-gray-700">
                Additional Resources
              </h3>
              <ul className="list-disc px-6 py-2">
                <li className="text-black p-2">
                  <b>Social media:</b> Search for and join relevant social media
                  groups, such as on Facebook the British Commonwealth Air
                  Training Plan in Canada or the Royal Canadian Air Force
                  Association.
                </li>
                <li className="text-black p-2">
                  <b>Websites:</b> There are dedicated websites to this topic
                  that may be helpful, such as{" "}
                  <Link
                    className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                    href={"https://caspir.warplane.com/"}
                  >
                    CASPIR: Canadian Aircraft Serials Personnel Information
                    Resource (Canadian Warplane Heritage Museum)
                  </Link>
                  ,{" "}
                  <Link
                    className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                    href={
                      "https://www.bombercommandmuseumarchives.ca/index.html"
                    }
                  >
                    Bomber Command Museum of Canada Archives
                  </Link>
                  ,{" "}
                  <Link
                    className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                    href={"https://aircrewremembered.com/"}
                  >
                    Aircrew Remembered
                  </Link>{" "}
                  and{" "}
                  <Link
                    className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                    href={"https://www.canadianletters.ca/collections/469"}
                  >
                    the Canadian Letters and Images Project
                  </Link>
                  .
                </li>
              </ul>
            </div>
          </div>
          <div className=" p-6">
            <h2 className="text-xl py-5 w-full px-2 bg-gray-800  sm:text-2xl font-semibold text-white mb-4">
              Write and Submit A Report
            </h2>
            <ul className="list-disc px-6 py-2">
              <li className="text-black p-2">
                Use the headings below to organize the information found and
                structure a report. If available, add pictures and images.
              </li>
              <li className="text-black p-2">
                Include the sources of information for all sections. Often, the
                name of the source of information and the URL link are listed at
                the end of each section.
              </li>
              <li className="text-black p-2">
                Save the final report as a WORD document (.docx)
              </li>
              <li className="text-black p-2">
                Go to the{" "}
                <Link
                  className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                  href={"/"}
                >
                  WWII Canadian MIA Aircrew Database
                </Link>{" "}
                and upload your completed report. Your report will be reviewed
                to verify the information and a summary of the findings posted
                on the database, with your permission.{" "}
              </li>
            </ul>
          </div>
          <table className="border border-black p-2 text-black">
            <tbody>
              <tr>
                <td className="border border-black p-2 text-black">
                  Suggested Title of Report
                </td>
                <td className="border FONT-BOLD border-black p-2 text-black">
                  Historical Research Report on (insert name of person being
                  researched): A WWII Canadian Aircrew with No Known Grave
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-black">
                  Authorship
                </td>
                <td className="border border-black p-2 text-black">
                  Your first and last name and the date the report was completed
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-black">
                  Section Headings
                </td>
                <td className="border border-black p-2 text-black">
                  <p className="pb-2">
                    <b>Demographic and Military Information:</b> Person’s name,
                    hometown, province, age, rank, service number, and squadron.
                    If available, include a picture of the person.
                  </p>
                  <p className="pb-2">
                    <b>Civil Life:</b> Describe the person's life before their
                    military career. It may be helpful to include a historical
                    perspective of the geographical, social, and/or cultural
                    settings of the province the person was from. For example,
                    in 1945, Newfoundland was not a Canadian province.
                  </p>
                  <p className="pb-2">
                    <b>Military Career:</b> Describe their military career up
                    until their final mission. Include awards, newspaper stories
                    or other information relevant to this section
                  </p>
                  <p className="pb-2">
                    <b>Final Mission and Death:</b> Describe a brief background
                    on the war during the final mission, the final mission and
                    information related to the crash and death.
                  </p>
                  <p>
                    <b>Memorial Actions:</b> Identify evidence to remember the
                    person.
                  </p>
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-black">
                  Sources of Information
                </td>
                <td className="border border-black p-2 text-black">
                  List the name and URL link of information sources used to
                  write the report.
                </td>
              </tr>
            </tbody>
          </table>
          <Image
            alt="flag"
            className="w-full max-h-[400px] opacity-70 py-4"
            src={canada_flag}
          ></Image>
          <div className="border border-black p-2 text-black">
            <p className="pb-2">
              <b>Acknowledgements: </b> The content of this guide was influenced
              by the Canadian War Museum (2025).{" "}
              <Link
                className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                href={
                  "https://www.warmuseum.ca/wp-content/uploads/2025/01/guide-war-dead-missing.pdf"
                }
              >
                Research Guides: Canada’s War Dead and Missing, 1914–1919,
                1939–1945
              </Link>{" "}
              and personal communication with Pat Carrigan, Citizen Scientist
              from Salt Springs, Nova Scotia and Michael Wilson, Legion Member
              and High School teacher, New Germany, Nova Scotia.
            </p>
            <p className="pb-2">
              <b>Reference for the guide: </b> Bergeron, K. (2025). A Guide for
              Conducting Historical Research: WWII Canadian Aircrew with No
              Known Grave. Acadia University Recovery Program. Available at{" "}
              <Link
                className="text-blue-500 underline cursor-pointer hover:text-blue-600 transition-300"
                href={"/"}
              >
                WWII Canadian MIA Aircrew Database
              </Link>
            </p>
            <p>
              <b>Disclaimer: </b>All links were active at the time of
              publication; however, this may change over time. If a link is
              broken, please refer to the name of the source provided.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
