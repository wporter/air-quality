import SideNavigation from "./SideNavigation";

const Protected = ({ children }) => {
  return (
    <div className="h-screen relative overflow-y-hidden w-full">
      <div className="flex h-full">
        <SideNavigation />
        <div className="w-full overflow-y-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Protected;
