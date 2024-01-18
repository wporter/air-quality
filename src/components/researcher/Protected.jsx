import Navigation from "@/components/researcher/Navigation";
import SideNavigation from "./SideNavigation";

const Protected = ({ children }) => {
  return (
    <div className="h-screen relative overflow-y-hidden">
      <Navigation />

      <div className="flex h-full mt-14">
        <SideNavigation />
        <div className="w-full overflow-y-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Protected;
