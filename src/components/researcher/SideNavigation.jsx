import Link from "next/link";

import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FiHelpCircle } from "react-icons/fi";

const SideNavigation = () => {
  return (
    <div className="w-2/12 h-screen flex flex-col justify-between">
      <div className="flex flex-col justify-start w-10/12 space-y-2">
        <Link
          href="/dashboard"
          className="text-[#363636] flex w-full no-underline items-center py-2 px-4 space-x-2 font-normal"
        >
          <MdOutlineDashboard />
          <div>Dashboard</div>
        </Link>

        <Link
          href="/users"
          className="text-[#363636] flex w-full no-underline items-center py-2 px-4 space-x-2 font-normal"
        >
          <FiUsers />
          <div>Users</div>
        </Link>

        {/* set to default researcher view for now */}
        <Link
          href="/researcher"
          className="text-[#363636] flex w-full no-underline items-center py-2 px-4 space-x-2 font-normal"
        >
          <FiUsers />
          <div>Menu Option</div>
        </Link>

        {/* set to default researcher view for now */}
        <Link
          href="/researcher"
          className="text-[#363636] flex w-full no-underline items-center py-2 px-4 space-x-2 font-normal"
        >
          <FiUsers />
          <div>Menu Option</div>
        </Link>

        <Link
          href="/help"
          className="text-[#363636] flex w-full no-underline items-center py-2 px-4 space-x-2 font-normal"
        >
          <FiHelpCircle />
          <div>Help</div>
        </Link>
      </div>
    </div>
  );
};

export default SideNavigation;
