import Welcome from "@/components/Welcome";
import { getLocations } from "../utils/api";
import Map from "@/components/Map/Map";

const Page = async () => {
  const { data, meta } = await getLocations();

  const markers = {
    markers: data,
    total: meta.total,
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      <Welcome />
      <div className="text-5xl font-bold my-10 text-left w-11/12">
        <p className="my-4">Public View</p>
        <Map height="h-[60vh]" width="w-full" markers={markers.markers} />
      </div>
    </div>
  );
};

export default Page;
