import Data from "@/components/researcher/data/Data";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <Data />
    </Suspense>
  );
};

export default Page;
