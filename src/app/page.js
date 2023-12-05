"use client";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <button onClick={() => signIn("google")}>Sign in</button>
      <Map />
    </div>
  );
};

export default Page;
