"use client";
import dynamic from "next/dynamic";
import {
  MdOutlineSignalWifi4Bar,
  MdOutlineNetworkWifi1Bar,
} from "react-icons/md";
import Status from "./Status";
import Data from "@/components/researcher/dashboard/Data";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

const Leaflet = dynamic(() => import("../../Map"), { ssr: false });

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api("GET", "/api/locations").then(({ data }) => setData(data));
  }, []);

  return (
    <div className="h-full w-full bg-air-white-100 pt-10">
      <div className="w-full h-2/4 bg-air-white-100 flex pl-8">
        <Leaflet height="h-full" width="w-9/12" markers={data} />
        <div className="w-3/12 flex flex-col gap-6 justify-center items-center">
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
                      new Date().getTime() - new Date(last_seen).getTime(),
                    ).getTime() /
                      (1000 * 60),
                  ) <= 1000,
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
                      new Date().getTime() -
                        new Date(
                          new Date(last_seen).getTime() -
                            new Date().getTimezoneOffset() * 60000,
                        ),
                    ).getTime() /
                      (1000 * 60),
                  ) >
                  60 * 5,
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
