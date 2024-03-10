import Protected from "@/components/researcher/Protected";
import Dashboard from "@/components/researcher/dashboard/Dashboard";
import { getLocations, getMarkers } from "@/utils/api";

const Page = async () => {
  const { data } = await getLocations();
  const { items } = await getMarkers();

  return (
    <Protected>
      <Dashboard locations={data} markers={items} />
    </Protected>
  );
};

export default Page;
