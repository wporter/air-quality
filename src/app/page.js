"use client";
// Import necessary modules/components
import React from "react";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import NavBar from "@/components/static/NavBar"; // Import the NavBar component

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <NavBar />

      <button onClick={() => signIn("google")}>SIGN IN</button>
      <Map />
    </div>
  );
};

export default Page;
