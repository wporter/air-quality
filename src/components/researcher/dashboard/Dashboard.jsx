import {
  MdOutlineSignalWifi4Bar,
  MdOutlineNetworkWifi1Bar,
} from "react-icons/md";
import Status from "./Status";
import Data from "@/components/researcher/dashboard/Data";
import Map from "@/components/Map/Map";

const Dashboard = ({ locations, markers }) => {
  return (
    <div className="h-screen w-full bg-air-white-100 pt-2">
      <div className="w-full h-1/2 bg-air-white-100 flex pl-8 pt-4">
        <Map height="h-full" width="w-9/12" markers={markers} />
        <div className="w-3/12 flex flex-col gap-6 justify-center items-center mt-[-8px]">
          <Status
            bg="bg-sensor-green"
            Icon={MdOutlineSignalWifi4Bar}
            color="text-green-400"
            value={
              markers.filter(
                // eslint-disable-next-line camelcase
                ({ timestamp_local }) =>
                  parseInt(
                    new Date(
                      new Date().getTime() -
                        new Date(timestamp_local).getTime(),
                    ).getMinutes(),
                  ) <= 60,
              ).length
            }
            text="Sensors Online"
          />
          <Status
            bg="bg-sensor-red"
            Icon={MdOutlineNetworkWifi1Bar}
            color="text-red-400"
            value={
              markers.filter(
                // eslint-disable-next-line camelcase
                ({ timestamp_local }) =>
                  parseInt(
                    new Date(
                      new Date().getTime() -
                        new Date(timestamp_local).getTime(),
                    ).getMinutes(),
                  ) > 60,
              ).length
            }
            text="Sensors Offline"
          />
        </div>
      </div>
      <Data data={locations} />
    </div>
  );
};

export default Dashboard;
