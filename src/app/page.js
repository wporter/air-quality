"use client";
import { signIn } from "next-auth/react";
import Welcome from "@/components/Welcome";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <button onClick={() => signIn("google")}>Sign in</button>
      <Welcome />
      <Map />
    </div>
  );
};

export default Page;
