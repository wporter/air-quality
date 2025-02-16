import Welcome from "@/components/Welcome";
import Footer from "@/components/Footer";
import { getMarkers } from "@/utils/api";
import { ArcGIS } from "@/components/Map/Map";

const Page = async () => {
  const { items } = await getMarkers();

  const indoorSensors = [
    "MOD-PM-00162",
    "MOD-PM-00407",
    "MOD-PM-00396",
    "MOD-PM-00160",
    "MOD-PM-00399",
    "MOD-PM-00405",
  ];

  const outdoorMarkers = items.filter(
    (item) => !indoorSensors.includes(item.sn),
  );

  return (
    <div className="flex flex-col justify-center items-center relative">
      <Welcome />
      <div className="my-10 w-11/12" id="public-view-section">
        <p className="my-4 font-bold text-5xl">Public View</p>
        <ArcGIS height="h-[60vh]" width="w-full" markers={outdoorMarkers} />
      </div>

      <Footer />
    </div>
  );
};

export default Page;
