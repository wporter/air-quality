"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ImOmega } from "react-icons/im";

const Navigation = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 w-full bg-white flex justify-between items-center py-3 px-8 z-10 drop-shadow-xl">
      <div className="flex items-center">
        <ImOmega className="text-air-blue-200 text-3xl" />
        <p className="text-air-blue-200 text-3xl font-light ml-2">
          <span className="font-bold">OMEGA</span>INITIATIVE
        </p>
      </div>

      <div className=" px-5 py-0.4 text-air-blue-200 text-xl ml-auto font-light">
        <button className="px-24">About Us</button>
      </div>

      <div className="rounded-lg px-6 py-1 text-air-blue-200 border-2 border-air-blue-200 text-xl font-medium">
        <button onClick={() => (session ? signOut() : signIn("google"))}>
          {session ? "SIGN OUT" : "SIGN IN"}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
