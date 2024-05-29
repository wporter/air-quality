"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { ImOmega } from "react-icons/im";
import { User } from "../app/hooks/Auth";
import Form from "./Form";

const Navigation = () => {
  const { user } = useContext(User);
  const [form, setForm] = useState(false);

  return (
    <div className="w-full bg-white flex justify-between items-center py-3 px-8 z-10 drop-shadow-md">
      <Link href="/" className="flex items-center">
        <ImOmega className="text-air-blue-200 text-3xl" />
        <p className="text-air-blue-200 text-3xl font-light ml-2">
          <span className="font-bold">OMEGA</span>INITIATIVE
        </p>
      </Link>

      <div className="px-5 py-0.4 text-air-blue-300 text-xl ml-auto mr-8 font-light">
        <Link href="/about">
          <p className="group text-blue-500 transition-all duration-500 ease-in-out relative">
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-air-blue-200 bg-opacity-75 transform transition-all duration-500 ease-in-out group-hover:w-full rounded-full"></span>
          </p>
        </Link>
      </div>

      {user && (
        <Link
          href="/researcher"
          className="rounded-lg px-6 py-1 text-air-blue-200 border-2 border-air-blue-200 text-xl font-medium hover:bg-air-blue-200 hover:bg-opacity-25 transition-colors duration-300"
        >
          Dashboard
        </Link>
      )}

      {!user && (
        <button
          onClick={() => setForm(true)}
          className="rounded-lg px-6 py-1 text-air-blue-200 border-2 border-air-blue-200 text-xl font-medium hover:bg-air-blue-200 hover:bg-opacity-25 transition-colors duration-300"
        >
          Sign In
        </button>
      )}

      {form && <Form setForm={setForm} />}
    </div>
  );
};

export default Navigation;
