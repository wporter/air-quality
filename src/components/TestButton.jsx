"use client";
import { signIn, signOut } from "next-auth/react";

export default function TestButton({ signedin }) {
  console.log(`signin: ${signedin === true ? "true" : "False"}`);

  return (
    <button
      onClick={() => {
        if (signedin === true) {
          signOut();
        } else {
          signIn("google");
        }
      }}
    >
      {signedin === true ? "Sign Out" : "Sign In"}
    </button>
  );
}
