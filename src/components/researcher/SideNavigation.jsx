import Link from "next/link";
import { ImOmega } from "react-icons/im";
import { MdOutlineDashboard } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";

const SideNavigation = () => {
  return (
    <div className="min-h-screen z-10 flex flex-col justify-between shadow-2xl">
      <div className="flex flex-col justify-center items-center space-y-2 mt-8">
        <ImOmega className="text-air-blue-200 text-3xl" />
        <p className="text-air-blue-200 text-xl font-bold">OMEGA</p>
        <Link
          href="/researcher"
          className="text-nav-black flex items-center w-full no-underline py-2 px-4 font-normal hover:bg-nav-hover transition-colors duration-300"
        >
          <MdOutlineDashboard className="text-nav-grey text-xl mx-2" />
          <div>Dashboard</div>
        </Link>
        <Link
          href="/help"
          className="text-nav-black flex items-center w-full no-underline py-2 px-4 font-normal hover:bg-nav-hover transition-colors duration-300"
        >
          <FiHelpCircle className="text-nav-grey text-xl mx-2" />
          <div>Help</div>
        </Link>
      </div>
    </div>
  );
};

export default SideNavigation;
