"use client";
import Protected from "../Protected";
import Information from "./Information";
import { useSearchParams } from "next/navigation";

const Data = () => {
  const searchParams = useSearchParams();
  const sn = searchParams.get("sn");

  return (
    <Protected>
      <Information sn={sn} />
    </Protected>
  );
};

export default Data;
