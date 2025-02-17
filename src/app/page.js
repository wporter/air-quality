import Welcome from "@/components/Welcome";
import Footer from "@/components/Footer";
import { getMarkers } from "@/utils/api";
import { ArcGIS } from "@/components/Map/Map";

const Page = async () => {
  const { items } = await getMarkers();

  // Filter to include only outdoor sensors dynamically
  const outdoorMarkers = items.filter((item) => item.outdoors === true);

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
