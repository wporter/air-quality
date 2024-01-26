"use client";
import dynamic from "next/dynamic";
import {
  MdOutlineSignalWifi4Bar,
  MdOutlineNetworkWifi1Bar,
} from "react-icons/md";
import Status from "./Status";
import { useSession } from "next-auth/react";

const Leaflet = dynamic(() => import("../../Map"), { ssr: false });

const Map = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  return (
    <div className="h-1/2 w-full bg-air-white-100">
      <p className="text-2xl font-light text-air-black-300 pt-10 pb-6 pl-8">
        Welcome, {userName}
      </p>
      <div className="w-full h-full bg-air-white-100 flex pl-8">
        <Leaflet height="h-5/6" width="w-9/12" markers={[]} />
        <div className="w-2/12 ml-20 flex flex-col space-y-16">
          <Status
            bg="bg-sensor-green"
            Icon={MdOutlineSignalWifi4Bar}
            color="text-green-400"
            value={300}
            text="Sensors Online"
          />

          <Status
            bg="bg-sensor-red"
            Icon={MdOutlineNetworkWifi1Bar}
            color="text-red-400"
            value={200}
            text="Sensors Offline"
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
