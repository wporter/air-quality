import Welcome from "@/components/Welcome";
import Map from "@/components/Map/Map";
import { getLocations } from "@/utils/api";

const Page = ({ markers }) => {
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

export const getStaticProps = async () => {
  const { data, meta } = await getLocations();

  const markers = {
    markers: data,
    total: meta.total,
  };

  return { props: { markers } };
};
