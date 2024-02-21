import Data from "@/components/researcher/data/Data";
import Protected from "@/components/researcher/Protected";

const Page = ({ searchParams }) => {
  const sn = searchParams["sn"];

  return (
    <Protected>
      <Data sn={sn} />
    </Protected>
  );
};

export default Page;
