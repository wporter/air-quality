import Link from "next/link";

import { LuArrowLeft } from "react-icons/lu";

const BackToHomeButton = () => {
  return (
    <Link
      href="/"
      className="flex items-center rounded-xl px-4 py-2.5 text-air-blue-200 border border-air-blue-200 text-xl"
    >
      <LuArrowLeft className="text-air-blue text-2xl font-bold" />
      <p className="text-air-blue-200 text-lg font-normal ml-2">
        BACK TO HOMEPAGE
      </p>
    </Link>
  );
};

export default BackToHomeButton;
