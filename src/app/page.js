"use client";
import { signIn } from "next-auth/react";
import Welcome from "@/components/Welcome";

const Page = () => {
  return (
    <div className="m-0 p-0 h-screen overflow-hidden">
      <button onClick={() => signIn("google")}>Sign in</button>
      <Welcome />
    </div>
  );
};

export default Page;
