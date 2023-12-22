import Data from "@/components/researcher/dashboard/Data";
import Map from "@/components/researcher/dashboard/Map";
import Protected from "@/components/researcher/Protected";

const Page = () => {
  return (
    <Protected>
      <Map />
      <Data />
    </Protected>
  );
};

export default Page;
