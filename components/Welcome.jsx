import Image from "next/image";
import Waves from "@/public/svg/landingWaves.svg";
import { FaChevronDown } from "react-icons/fa";

const Welcome = () => {
  return (
    <div className="relative flex flex-col items-center justify-between h-screen">
      <Image
        src={Waves}
        className="absolute top-0 left-0 -z-10 w-screen h-screen object-cover"
        alt="Home Page Waves"
      />
      <div className="h-full w-11/12 flex flex-col items-center justify-center text-center">
        <p className="text-8xl font-bold mb-10">Air Quality you can trust.</p>
        <p className="text-3xl font-base">
          Lorem ipsum dolor sit amet. Sit accusamus galisum qui odio minus non
          repudiandae voluptatibus ut incidunt quia eum quisquam doloremque qui
          possimus voluptatem est quasi culpa. Est labore quis ad quos beatae
          non consequatur velit.
        </p>
      </div>

      <div className="flex flex-col items-center mb-10">
        <p className="text-2xl font-base">Access Data</p>
        <FaChevronDown
          size={28}
          className="transition-transform transform hover:scale-125 hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Welcome;
