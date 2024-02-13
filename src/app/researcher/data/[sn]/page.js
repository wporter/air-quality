import Data from "@/components/researcher/data/Data";
import Protected from "@/components/researcher/Protected";

const Page = ({ params }) => {
  return (
    <Protected>
      <Data params={params} />
    </Protected>
  );
};

export default Page;
