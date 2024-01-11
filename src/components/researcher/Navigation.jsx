"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";

const Navigation = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed left-0 w-full bg-white flex justify-between items-center py-3 px-3 z-10 drop-shadow-xl">
      <div>
        <p className="text-air-blue-200 text-1xl">
          <span className="">&Omega;</span>
          <span className="font-bold "> OMEGA</span>INITIATIVE
        </p>
      </div>

      <div className=" px-5 py-0.4 text-air-black text-xl ml-auto font-normal">
        <button>{session ? session.user.name : "User"}</button>
      </div>
      <FaUser className="" />

      <div className=" px-5 py-0.4 text-air-black-100 text-sm">
        <button onClick={() => (session ? signOut() : signIn("google"))}>
          {session ? "LOG OUT" : "LOG IN"}
        </button>
      </div>
      <PiSignOutBold />
    </div>
  );
};

export default Navigation;
