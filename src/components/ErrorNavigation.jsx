"use client";
import { ImOmega } from "react-icons/im";

const ErrorNavigation = () => {
  return (
    <div className="fixed top-3 left-0 w-full bg-white flex justify-between items-center py-3 px-8 z-10">
      <div className="flex items-center">
        <ImOmega className="text-air-blue text-3xl" />
        <p className="text-air-blue text-3xl font-light ml-2">
          <span className="font-bold">OMEGA</span>INITIATIVE
        </p>
      </div>
    </div>
  );
};

export default ErrorNavigation;
