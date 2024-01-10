import Image from "next/image";
import Waves from "../../public/svg/errorWaves.svg";
import ErrorNav from "@/components/ErrorNavigation";
import BackToHomeButton from "@/components/BackToHomeButton";

const Error = ({ statusCode, errorName, message }) => {
  return (
    <div className="relative flex flex-col items-center justify-between h-screen">
      <ErrorNav />
      <Image
        src={Waves}
        className="absolute top-64 left-0 -z-10 w-screen h-screen object-cover"
      />

      <div className="h-full w-11/12 flex flex-col items-center justify-center text-center">
        <p className="text-center text-8xl font-semibold italic text-air-blue m-0">
          {statusCode}
        </p>
        <p className="text-center text-xl md:text-2xl font-light italic text-air-blue m-0 mt-2">
          {errorName}
        </p>
        <p className="text-center text-sm md:text-base text-air-blue m-0">
          {message}
        </p>

        <div className="mt-16">
          <BackToHomeButton />
        </div>
      </div>
    </div>
  );
};

export default Error;
