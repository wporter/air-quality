import Dashboard from "@/components/researcher/dashboard/Dashboard";
import { getLocations } from "@/utils/api";

const Page = async () => {
  const { data, meta } = await getLocations();

  const markers = {
    markers: data,
    total: meta.total,
  };

  return <Dashboard data={markers} />;
};

export default Page;
