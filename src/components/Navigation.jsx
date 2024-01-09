"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const Navigation = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 w-full bg-white flex justify-between items-center py-3 px-8 z-10 drop-shadow-xl">
      <div>
        <p className="text-air-blue text-3xl">
          <span>&Omega;</span>
          <span className="font-bold"> OMEGA</span>INITIATIVE
        </p>
      </div>

      <div className=" px-5 py-0.4 text-air-blue2 text-xl ml-auto">
        <button className="px-24">ABOUT US</button>
      </div>

      <div className="rounded px-5 py-0.4 text-air-blue2 border-2 border-air-blue2 text-xl">
        <button onClick={() => (session ? signOut() : signIn("google"))}>
          {session ? "SIGN OUT" : "SIGN IN"}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
