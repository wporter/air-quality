import Image from "next/image";
import Waves from "../../public/landingWaves.svg";
import { FaChevronDown } from "react-icons/fa";

const Welcome = () => {
  return (
    <div className="relative flex flex-col items-center justify-between h-screen">
      <Image
        src={Waves}
        className="absolute top-0 left-0 -z-10 w-screen object-cover"
      />

      <div className="flex flex-col items-center justify-center flex-1 p-32 text-center">
        <div className="space-y-14">
          <p className="text-7xl font-bold">Air Quality you can trust.</p>
          <p className="text-2xl font-base">
            Lorem ipsum dolor sit amet. Sit accusamus galisum qui odio minus non
            repudiandae voluptatibus ut incidunt quia eum quisquam doloremque
            qui possimus voluptatem est quasi culpa. Est labore quis ad quos
            beatae non consequatur velit.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center mb-14 space-y-2">
        <p className="text-2xl font-base">Access Data</p>
        <FaChevronDown
          size={28}
          className="transition-transform transform hover:scale-125"
        />
      </div>
    </div>
  );
};

export default Welcome;
