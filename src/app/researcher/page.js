import Protected from "@/components/researcher/Protected";
import Dashboard from "@/components/researcher/dashboard/Dashboard";
import { getLocations } from "@/utils/api";

const Page = async () => {
  const { data, meta } = await getLocations();

  const markers = {
    markers: data,
    total: meta.total,
  };

  return (
    <Protected>
      <Dashboard data={markers} />
    </Protected>
  );
};

export default Page;
