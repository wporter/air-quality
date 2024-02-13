import Link from "next/link";

import { MdOutlineDashboard } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";
import { AiOutlinePieChart } from "react-icons/ai";

const SideNavigation = () => {
  return (
    <div className="ml-2 w-2/12 h-screen flex flex-col justify-between">
      <div className="flex flex-col justify-start space-y-2">
        <Link
          href="/researcher"
          className="mt-10 text-[#363636] flex items-center w-full no-underline py-2 px-4 space-x-12 font-normal hover:bg-nav-hover transition-colors duration-300"
        >
          <MdOutlineDashboard className="text-[#898989] text-xl" />
          <div>Dashboard</div>
        </Link>
        <Link
          href="/data"
          className="text-nav-black flex items-center w-full no-underline py-2 px-4 space-x-12 font-normal hover:bg-nav-hover transition-colors duration-300"
        >
          <AiOutlinePieChart className="text-nav-grey text-xl" />
          <div>Data</div>
        </Link>

        <Link
          href="/help"
          className="text-nav-black flex items-center w-full no-underline py-2 px-4 space-x-12 font-normal hover:bg-nav-hover transition-colors duration-300"
        >
          <FiHelpCircle className="text-nav-grey text-xl" />
          <div>Help</div>
        </Link>
      </div>
    </div>
  );
};

export default SideNavigation;
