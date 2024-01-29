"use client";
import dynamic from "next/dynamic";
import {
  MdOutlineSignalWifi4Bar,
  MdOutlineNetworkWifi1Bar,
} from "react-icons/md";
import Status from "./Status";
import { useSession } from "next-auth/react";
import Data from "@/components/researcher/dashboard/Data";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

const Leaflet = dynamic(() => import("../../Map"), { ssr: false });

const Dashboard = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const [data, setData] = useState([]);

  useEffect(() => {
    api("GET", "/api/locations").then(({ data }) => setData(data));
  }, []);

  return (
    <div className="h-1/2 w-full bg-air-white-100">
      <p className="text-2xl font-light text-air-black-300 pt-10 pb-2 pl-8">
        Welcome, {userName}
      </p>
      <div className="w-full h-full bg-air-white-100 flex pl-8">
        <Leaflet height="h-full" width="w-9/12" markers={data} />
        <div className="w-2/12 ml-20 flex flex-col gap-3">
          <Status
            bg="bg-sensor-green"
            Icon={MdOutlineSignalWifi4Bar}
            color="text-green-400"
            value={
              data.filter(
                // eslint-disable-next-line camelcase
                ({ last_seen }) =>
                  parseInt(
                    new Date(
                      new Date().getTime() - new Date(last_seen).getTime()
                    ).getTime() /
                      (1000 * 60)
                  ) <= 1000
              ).length
            }
            text="Sensors Online"
          />

          <Status
            bg="bg-sensor-red"
            Icon={MdOutlineNetworkWifi1Bar}
            color="text-red-400"
            value={
              data.filter(
                // eslint-disable-next-line camelcase
                ({ last_seen }) =>
                  parseInt(
                    new Date(
                      new Date().getTime() - new Date(last_seen).getTime()
                    ).getTime() /
                      (1000 * 60)
                  ) > 1000
              ).length
            }
            text="Sensors Offline"
          />
        </div>
      </div>
      <Data data={data} />
    </div>
  );
};

export default Dashboard;
