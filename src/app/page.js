"use client";
import { signIn } from "next-auth/react";

const Page = () => {
  return (
    <div>
      <button onClick={() => signIn("google")}>Login</button>
    </div>
  );
};

export default Page;
