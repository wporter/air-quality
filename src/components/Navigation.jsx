"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const Navigation = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 w-full bg-white flex justify-between items-center py-3 px-8 z-[10000] drop-shadow-xl">
      <div>
        <p className="text-air-green font-bold text-3xl">OMEGA INTIATIVE</p>
        <i className="">Air Quality Data in Ontario</i>
      </div>

      <div className="rounded px-3 py-0.5 text-air-green border-2 border-air-green text-xl">
        <button onClick={() => (session ? signOut() : signIn("google"))}>
          {session ? "log out" : "login"}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
