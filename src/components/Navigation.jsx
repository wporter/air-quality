"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ImOmega } from "react-icons/im";

const Navigation = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full bg-white flex justify-between items-center py-3 px-8 z-10 drop-shadow-xl">
      <Link href="/" className="flex items-center">
        <ImOmega className="text-air-blue-200 text-3xl" />
        <p className="text-air-blue-200 text-3xl font-light ml-2">
          <span className="font-bold">OMEGA</span>INITIATIVE
        </p>
      </Link>

      <div className="px-5 py-0.4 text-air-blue-300 text-xl ml-auto mr-20 font-light">
        <Link href="/about">
          <p className="group text-blue-500 transition-all duration-500 ease-in-out relative">
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-air-blue-200 to-air-blue-300 transform transition-all duration-500 ease-in-out group-hover:w-full rounded-full"></span>
          </p>
        </Link>
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
