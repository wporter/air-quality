import SideNavigation from "./SideNavigation";

const Protected = ({ children }) => {
  return (
    <div className="h-screen relative w-full">
      <div className="flex h-full">
        <SideNavigation />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Protected;
