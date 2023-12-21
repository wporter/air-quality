import Protected from "@/components/researcher/Protected";
import Header from "@/components/researcher/members/Header";
import Members from "@/components/researcher/members/Members";
import React from "react";

const Page = () => {
  return (
    <Protected>
      <Header />
      <Members />
    </Protected>
  );
};

export default Page;
