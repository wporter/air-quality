"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";
import { ImOmega } from "react-icons/im";
import { FaCircleUser } from "react-icons/fa6";

const Navigation = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  return (
    <div className="fixed top-0 left-0 w-full bg-white flex justify-between items-center py-3 px-3 z-10 drop-shadow-xl">
      <div className="flex items-center">
        <ImOmega className="text-air-blue-200 text-3xl" />
        <p className="text-air-blue-200 text-3xl font-light ml-2">
          <span className="font-bold">OMEGA</span>INITIATIVE
        </p>
      </div>

      <div className="flex items-center px-5 py-0.4 py-1 text-black text-lg ml-auto font-normal">
        {userName}
        <FaCircleUser className="ml-3 mr-10 text-[#8DC7E8] text-4xl" />
      </div>

      <div className="px-5 py-0.4 text-[#383838] text-lg font-medium">
        <button
          className="flex items-center"
          onClick={() => (session ? signOut() : signIn("google"))}
        >
          {session ? "LOG OUT" : "LOG IN"}
          <PiSignOutBold className="text-xl ml-2 text-[#383838] font-medium" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
