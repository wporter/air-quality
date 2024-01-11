import React from "react";

const Footer = () => {
  return (
    <div className="w-full grid grid-cols-2 px-16 py-8 bg-white border-t-2 border-[#E0E0E0]">
      <div className=" flex flex-col">
        <div>
          <p className="text-air-black text-xl">
            <span>&Omega;</span>
            <span className="font-bold"> OMEGA</span>
            <span className="font-light">INITIATIVE</span>
          </p>
        </div>
        <p className="text-sm font-light">Ontario, California</p>
      </div>
      <div className="flex flex-col items-end gap-y-1">
        <p className="text-sm font-light">Contact</p>
        <p className="text-sm font-medium">dummy@email.com</p>
      </div>
    </div>
  );
};

export default Footer;
