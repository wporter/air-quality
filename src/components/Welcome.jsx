"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Waves from "@/public/svg/landingWaves.svg";
import { FaChevronDown } from "react-icons/fa";
import Navigation from "@/components/Navigation";

const Welcome = () => {
  useEffect(() => {
    const chevronDown = document.getElementById("chevron-down");
    if (chevronDown) {
      const scrollToPublicView = () => {
        const section = document.getElementById("public-view-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      };

      chevronDown.addEventListener("click", scrollToPublicView);
      return () => chevronDown.removeEventListener("click", scrollToPublicView);
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen w-full overflow-hidden">
      <Navigation />
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          src={Waves}
          className="absolute top-0 left-0 -z-10 object-cover w-full h-full"
          alt="Home Page Waves"
        />
      </div>
      <div className="w-full md:w-11/12 lg:w-3/4 xl:w-2/3 relative z-10 flex flex-col items-center justify-center text-center">
        <p className="text-8xl font-bold mb-10 text-air-black-100">
          Air Quality you can trust.
        </p>
        <p className="text-3xl font-base text-air-black-100">
          OMEGA Initiative: Objective Measurement / Monitoring / Mitigation of
          Emissions from Goods Movement and Impacts on Air Quality.
        </p>
      </div>

      <div className="flex flex-col items-center mb-10">
        <p className="text-3xl font-base text-air-black-100">Access Data</p>
        <FaChevronDown
          id="chevron-down"
          className="transition-transform transform hover:scale-125 hover:cursor-pointer text-air-black-100 text-4xl pt-2"
        />
      </div>
    </div>
  );
};

export default Welcome;
