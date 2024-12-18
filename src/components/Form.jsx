"use client";
import { api } from "@/utils/api";
import { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ImOmega } from "react-icons/im";
import { User } from "../app/hooks/Auth";
import { toast } from "react-hot-toast";

const Form = ({ setForm }) => {
  const { setUser } = useContext(User);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSignIn = async () => {
    const { username, message } = await api("POST", "/api/auth", {}, data);

    if (message === "Invalid credentials") {
      toast.error("Username and Password Invalid");
      return;
    }

    if (message === "user not found") {
      toast.error("Username Invalid");
      return;
    }

    localStorage.setItem("user", username);
    setUser(username);
    setForm(false);
    toast.success("Successfully Signed In");
  };

  return (
    <div className="fixed h-screen w-screen bg-black/40 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-8 z-10">
      <div className="bg-white rounded-xl w-1/3 p-8">
        <div className="flex justify-end w-full">
          <FaTimes
            onClick={() => setForm(false)}
            className="text-xl hover:text-red-500 hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <ImOmega className="text-air-blue-200 text-3xl" />
          <p className="text-3xl font-semibold">Sign In</p>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={data.username}
              placeholder="username"
              className="border-2 border-air-blue-200 focus:outline-none rounded p-2"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={data.password}
              placeholder="password"
              className="border-2 border-air-blue-200 focus:outline-none rounded p-2"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <button
            onClick={handleSignIn}
            className="rounded-lg px-6 py-1 text-air-blue-200 border-2 border-air-blue-200 text-xl font-medium hover:bg-air-blue-200 hover:bg-opacity-25 transition-colors duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
