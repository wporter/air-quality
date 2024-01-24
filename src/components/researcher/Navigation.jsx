"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";
import { ImOmega } from "react-icons/im";

const Navigation = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed left-0 w-full bg-white flex justify-between items-center py-3 px-3 z-10 drop-shadow-xl">
      <span className="text-air-blue-200 text-sm px-1">
        <ImOmega />
      </span>
      <div>
        <p className="text-air-blue-200 text-1xl">
          <span className="font-bold "> OMEGA</span>INITIATIVE
        </p>
      </div>

      <div className="pr-2 px-2 p y-0.4 text-air-black text-md ml-auto font-normal">
        <button>{session ? session.user.name : "User"}</button>
      </div>

      <div className="font-bold text-lg border bg-air-blue-300 border-air-blue-100 rounded-full h-9 w-9 flex items-center justify-center">
        <button onClick={() => (session ? signOut() : signIn("google"))}>
          {session ? session.user.name[0] : "U"}
        </button>
      </div>

      <div className="font-bold px-4 py-0.4 pr-2 pl-20 text-air-black-100 text-sm text">
        <button onClick={() => (session ? signOut() : signIn("google"))}>
          {session ? "LOG OUT" : "LOG IN"}
        </button>
      </div>
      <PiSignOutBold />
    </div>
  );
};

export default Navigation;
