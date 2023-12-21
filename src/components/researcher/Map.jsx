"use client";
import dynamic from "next/dynamic";
import {
  MdOutlineSignalWifi4Bar,
  MdOutlineNetworkWifi1Bar,
} from "react-icons/md";
import Status from "./Status";

const Leaflet = dynamic(() => import("../Map"), { ssr: false });

const Map = () => {
  return (
    <div className="h-1/2 w-full bg-purple-500">
      Welcome William
      <div className="w-full h-full bg-green-500 flex">
        <Leaflet height="h-5/6" width="w-10/12" markers={[]} />
        <div className="w-2/12 p-3">
          <Status
            bg="bg-green-200"
            Icon={MdOutlineSignalWifi4Bar}
            color="text-green-400"
            value={200}
            text="sensors online"
          />
          <Status
            bg="bg-red-200"
            Icon={MdOutlineNetworkWifi1Bar}
            color="text-red-400"
            value={100}
            text="sensors offline"
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
