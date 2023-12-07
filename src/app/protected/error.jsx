"use client";
import { signIn } from "next-auth/react";

const protectedError = () => {
  return (
    <>
      <p>401! You are not authorized to view this page!</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          signIn("google", { callbackUrl: "/" });
        }}
      >
        Sign In
      </button>
    </>
  );
};

export default protectedError;
