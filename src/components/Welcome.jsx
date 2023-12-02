import Image from "next/image";
import Waves from "../../public/landingWaves.svg";

const Welcome = () => {
  return (
    <div className="relative flex flex-col justify-center items-center text-center h-screen">
      <Image
        src={Waves}
        className="absolute top-0 left-0 -z-10 w-screen object-cover"
      />

      <div className="space-y-8 p-32">
        <p className="text-7xl font-bold">Air Quality you can trust.</p>
        <p className="text-2xl font-base">
          Lorem ipsum dolor sit amet. Sit accusamus galisum qui odio minus non
          repudiandae voluptatibus ut incidunt quia eum quisquam doloremque qui
          possimus voluptatem est quasi culpa. Est labore quis ad quos beatae
          non consequatur velit.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
