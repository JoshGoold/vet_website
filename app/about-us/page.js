"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import logVisit from "@/utils/logVisit";

import kim from "../../assets/kim-about-us-img.jpg";
import josh from "../../assets/pic1.jpeg";

const page = () => {
  const [state, setState] = useState("kim")
  const handleClick = (action) => {
    switch(action){
      case "left":
        if(state === "kim") setState("josh")
        else setState("kim")
        break;
      case "right":
        if(state === "josh") setState("kim")
        else setState("josh")
        break;
    }
  }
  const router = useRouter();

  useEffect(() => {
    logVisit(router.asPath);
  }, [router.asPath]);

  return (
    <div
      id="top"
      className="min-h-screen bg-gray-900 text-gray-100 flex  justify-center "
    >
      <div className="container  flex flex-col gap-6 p-6 bg-gray-800  shadow-lg">
        {/* How to Participate Section */}
        <div>
          <h2 className="text-3xl font-semibold text-center text-blue-400 mb-2">
            About Us
          </h2>
          <ul className="space-y-4 text-sm">
            <li className="flex lg:flex-row flex-col items-center justify-around">
              <div className="lg:max-w-[400px]">
                <p className="lg:pb-8 pb-3">
              <b className="text-xl">Designing the Database:</b>
              <br /> Bergeron and Goold collaborated to create the database in
              February 2025.
              </p>
              <p className="lg:pb-8 pb-3">
              <b className="text-xl">The Database Content:</b><br/> The names in this database come from
              the <Link  className="underline italic text-blue-300 hover:text-blue-500" href={"https://www.rcafassociation.ca/heritage/history/fallen-aviators/rcaf-casualties-second-world-war/"}>RCAF Causalities-Second World War webpage</Link>. We created a
              computer program to find those who have no known grave and organized
              their names by province and hometown. This work led to the
              identification of 3,749 missing aircrew personnel with no known grave, whose names are
              now part of this searchable database.
            </p>
            <p className="lg:pb-8 pb-3">
              <b className="text-xl">How to reference this database:</b><br/> Bergeron, K. & Goold, J.
              (2025) WWII Canadian MIA Aircrew Database. Acadia University
              Recovery Program. <Link  className="underline italic text-blue-300 hover:text-blue-500" href={"https://ww2-canadian-mia-aircrew-database.org/"}>WWII Canadian MIA Aircrew Database</Link>.
            </p>
              </div>
              <div className="flex lg:flex-row flex-col items-center justify-center">
                {state === "kim" && (
                <div className="flex-col justify-center lg:max-w-[500px] p-5 rounded-md h-[700px]  items-center flex gap-2">
                  <h1 className="font-bold text-2xl">OUR TEAM</h1>
                  <Image className="lg:w-[370px] object-cover lg:h-[370px] rounded-full h-[300px] w-[300px]" src={kim} alt="Dr. Kim Bergeron" />
                  <p>
                    <b>Dr. Kim Bergeron,</b> a social innovator and scientist,
                    developed the conceptual framework for the database,
                    including the vision for an accessible, searchable online
                    database to honour unaccounted-for Canadian military service
                    personnel by focusing on MIA aircrew with no known grave.
                  </p>
                  <div className="flex gap-5 items-center justify-center">
                  <button className="bg-gray-900 text-3xl rounded-full hover:scale-105 px-2 pb-1" onClick={()=> handleClick("left")}>{"<"}</button>
                  <button className="bg-gray-900 text-3xl rounded-full hover:scale-105 px-2 pb-1" onClick={()=> handleClick("right")}>{">"}</button>
                </div>
                </div>
                )}
                {state === "josh" && (
                <div className="flex-col justify-center lg:max-w-[500px] p-5 rounded-md h-[700px]  items-center flex gap-2">
                  <h1 className="font-bold text-2xl">OUR TEAM</h1>
                  <Image className="lg:w-[370px] object-cover rounded-full lg:h-[370px] h-[300px] w-[300px]" src={josh} alt="Joshua Goold" />
                  <p>
                    <b>Josh Goold,</b> a computer programmer, translated this
                    vision into a functional digital platform by designing and
                    building the underlying computer program that supports the
                    database’s structure and user interface.
                  </p>
                  <div className="flex gap-5 items-center justify-center">
                  <button className="bg-gray-900 text-3xl rounded-full hover:scale-105 px-2 pb-1"  onClick={()=> handleClick("left")}>{"<"}</button>
                  <button className="bg-gray-900 text-3xl rounded-full hover:scale-105 px-2 pb-1"   onClick={()=> handleClick("right")}>{">"}</button>
                </div>
                </div>
                )}
                
              </div>
              
            </li>
            <li>
              <b className="text-2xl">
                Why does the database focus on the WWII Canadian MIA Aircrew?
              </b>
              <p className=" pt-3">
                Almost all Army fatalities have known graves, and the portion of
                naval losses at sea are commemorated on memorials, and their remains
                are not recoverable. The approximately 3,000+ aircrew with no
                known graves are commemorated as having no known grave (Library
                and Archives Canada); however, some are recoverable. Conducting
                historical research will help us identify those that may be
                recoverable.
              </p>
            </li>
            <li>
              <b className="text-2xl">What does MIA mean?</b>
              <p className=" pt-3">
                According to the Department of National Defence (DAOD 5040-3), a
                person who died while serving in the Canadian military and has no
                known or maintainable grave is officially referred to as an
                “unaccounted-for military fatality.” Library and Archives Canada
                uses the term “missing inaction” (MIA) to describe military
                personnel whose whereabouts and status remain unknown following
                an operation. On this site, the 3,749 individuals are listed as
                missing in action or MIA. These individuals died while serving or
                training during WWII, have no known grave, and are officially
                considered MIA.
              </p>
            </li>
            <li>
              <b className="text-2xl">What is the Acadia University Recovery Program (AURP)</b>
              <p className=" pt-3">
                AURP is dedicated to developing and implementing an active
                recovery program focused on historical and investigative
                research. Its goal is to support the recovery, identification,
                and repatriation or commemoration of MIA military service
                personnel from World War I, World War II, and the Korean
                Conflict. This program is led by an interdisciplinary team: Dr.
                Aaron Taylor (Acadia University), Dr. Kim Bergeron (Queen’s
                University), and June McDonald-Jenkins (JDConsulting). The
                program was established in 2023 and officially launched on
                November 5, 2024.
              </p>
            </li>
            <li>
              <b className="text-2xl">Contact Us</b>
              <p className=" pt-3">
                Send an email to <Link className="underline italic text-blue-300 hover:text-blue-500" href={"mailto:researchassistantkim@gmail.com"}>Dr. Kim Bergeron</Link>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
