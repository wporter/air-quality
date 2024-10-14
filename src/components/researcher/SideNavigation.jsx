import Link from "next/link";
import React, { useState, useContext } from "react";
import { ImOmega } from "react-icons/im";
import { MdOutlineDashboard } from "react-icons/md";
import { MdMenuOpen } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { User } from "../../app/hooks/Auth";
import { useRouter } from "next/navigation";

const SideNavigation = () => {
  const router = useRouter();
  const { setUser } = useContext(User);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSignOut = () => {
    setUser(null);
    router.push("/");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`min-h-screen ${isCollapsed ? "w-16" : "w-48"} transition-all duration-300 z-10 flex-shrink-0 flex-grow-0 flex flex-col justify-between shadow-2xl py-4`}
    >
      <div className=" flex flex-col items-center space-y-1 mt-4">
        <button onClick={toggleSidebar} className="self-end mr-2">
          {isCollapsed ? <MdOutlineMenu /> : <MdMenuOpen />}
        </button>
        <div className=" flex flex-col items-center">
          <Link
            href="/"
            className="text-air-blue-200 flex flex-col items-center no-underline py-2"
          >
            <ImOmega className="text-3xl" />
            {!isCollapsed && <p className="text-xl font-bold pt-1">OMEGA</p>}
          </Link>
        </div>
        <Link
          href="/researcher"
          className="text-nav-black flex items-center w-full no-underline py-2 px-4 font-normal hover:bg-nav-hover transition-colors duration-300"
        >
          <MdOutlineDashboard className="text-nav-grey text-xl mx-2" />
          {!isCollapsed && <div>Dashboard</div>}
        </Link>
        <Link
          href="/help"
          className="text-nav-black flex items-center w-full no-underline py-2 px-4 font-normal hover:bg-nav-hover transition-colors duration-300"
        >
          <FiHelpCircle className="text-nav-grey text-xl mx-2" />
          {!isCollapsed && <div>Help</div>}
        </Link>
      </div>
      <div className="px-4 mb-4">
        <button
          onClick={handleSignOut}
          className="text-nav-black flex items-center w-full no-underline py-2 px-4 font-normal hover:text-red-500"
        >
          <FaSignOutAlt className="text-xl mx-2" />
          {!isCollapsed && <div>Signout</div>}
        </button>
      </div>
    </div>
  );
};

export default SideNavigation;
