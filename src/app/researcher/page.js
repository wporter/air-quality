import Dashboard from "@/components/researcher/dashboard/Dashboard";
import Protected from "@/components/researcher/Protected";

const Page = () => {
  return (
    <Protected>
      <Dashboard />
    </Protected>
  );
};

export default Page;
