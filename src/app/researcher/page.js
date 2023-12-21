import Data from "@/components/researcher/Data";
import Map from "@/components/researcher/Map";
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
