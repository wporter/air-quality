import Navigation from "@/components/researcher/Navigation";
import SideNavigation from "./SideNavigation";

const Protected = ({ children }) => {
  return (
    <div className="h-screen overflow-y-hidden">
      <Navigation />
      <div className="flex h-full">
        <SideNavigation />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Protected;
