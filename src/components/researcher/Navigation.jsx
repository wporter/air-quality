"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";
import { ImOmega } from "react-icons/im";

const Navigation = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 w-full bg-white flex justify-between items-center py-3 px-3 z-10 drop-shadow-xl">
      <div className="flex items-center">
        <ImOmega className="ml-2 text-air-blue-200 text-2xl" />
        <p className="text-air-blue-200 text-2xl font-light ml-2">
          <span className="font-bold">OMEGA</span>INITIATIVE
        </p>
      </div>

      <div className="flex items-center px-5 py-0.4 py-1 text-black text-lg ml-auto font-normal">
        <p>{session ? session.user.name : "User"}</p>
      </div>

      <div className="mr-20 font-semibold text-lg border bg-air-blue-300 border-air-blue-400 rounded-full h-9 w-9 flex items-center justify-center">
        <p>{session ? session.user.name[0] : "U"}</p>
      </div>

      <div className="px-5 py-0.4 text-black-200 text-base font-medium">
        <button
          className="flex items-center"
          onClick={() => (session ? signOut() : signIn("google"))}
        >
          {session ? "LOG OUT" : "LOG IN"}
          <PiSignOutBold className="text-xl ml-2 text-black-200 font-medium" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
