import {
  MdOutlineSignalWifi4Bar,
  MdOutlineNetworkWifi1Bar,
} from "react-icons/md";
import Status from "./Status";
import Data from "@/components/researcher/dashboard/Data";
import { ArcGIS } from "@/components/Map/Map";

const Dashboard = ({ locations, markers }) => {
  const now = new Date().getTime();

  const offlineSensors = markers.filter(({ timestampLocal }) => {
    if (timestampLocal === "No data available") return true;
    const sensorTime = new Date(timestampLocal).getTime();
    const diffMinutes = (now - sensorTime) / (1000 * 60);
    return diffMinutes <= 60;
  }).length;

  const onlineSensors = markers.filter(({ timestampLocal }) => {
    if (timestampLocal === "No data available") return false;
    const sensorTime = new Date(timestampLocal).getTime();
    const diffMinutes = (now - sensorTime) / (1000 * 60);
    return diffMinutes > 60;
  }).length;

  return (
    <div className="h-screen w-full bg-air-white-100 pt-2">
      <div className="w-full h-1/2 bg-air-white-100 flex pl-8 pt-4">
        <ArcGIS markers={markers} height="h-full" width="w-9/12" />
        <div className="w-3/12 flex flex-col gap-6 justify-center items-center mt-[-8px]">
          <Status
            bg="bg-sensor-green"
            Icon={MdOutlineSignalWifi4Bar}
            color="text-green-400"
            value={onlineSensors}
            text="Sensors Online"
          />
          <Status
            bg="bg-sensor-red"
            Icon={MdOutlineNetworkWifi1Bar}
            color="text-red-400"
            value={offlineSensors}
            text="Sensors Offline"
          />
        </div>
      </div>
      <Data data={locations} />
    </div>
  );
};

export default Dashboard;
