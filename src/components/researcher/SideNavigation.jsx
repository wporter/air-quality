import Link from "next/link";
import { ImOmega } from "react-icons/im";
import { MdOutlineDashboard } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import { User } from "../../app/hooks/Auth";
import { useRouter } from "next/navigation";

const SideNavigation = () => {
  const router = useRouter();
  const { setUser } = useContext(User);

  const handleSignOut = () => {
    setUser(null);
    router.push("/");
  };

  return (
    <div className="min-h-screen w-48 z-10 flex-shrink-0 flex-grow-0 flex flex-col justify-between shadow-2xl py-4">
      <div className="flex flex-col justify-center items-center space-y-2 mt-8">
        <Link
          href="/"
          className="text-air-blue-200 flex flex-col items-center no-underline py-2 px-4"
        >
          <ImOmega className="text-3xl" />
          <p className="text-xl font-bold pt-2 pb-5">OMEGA</p>
        </Link>
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
      <button
        onClick={handleSignOut}
        href="/help"
        className="text-nav-black flex items-center w-full no-underline py-2 px-4 font-normal hover:text-red-500"
      >
        <FaSignOutAlt className="text-xl mx-2" />
        <div>Signout</div>
      </button>
    </div>
  );
};

export default SideNavigation;
