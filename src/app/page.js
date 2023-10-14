"use client";
import { signIn } from "next-auth/react";

const Page = () => {
  return (
    <div>
      <button onClick={() => signIn("google")}>Sign in</button>
    </div>
  );
};

export default Page;
