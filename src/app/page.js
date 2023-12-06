"use client";
// Import necessary modules/components
import React from "react";
import { signIn } from "next-auth/react";
import NavBar from "@/components/static/NavBar"; // Import the NavBar component

const Page = () => {
  return (
    <div>
      <NavBar />

      <button onClick={() => signIn("google")}>SIGN IN</button>
    </div>
  );
};

export default Page;
