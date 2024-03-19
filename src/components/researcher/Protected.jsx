import SideNavigation from "./SideNavigation";

const Protected = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      <SideNavigation />
      <div className="flex-grow overflow-auto">{children}</div>
    </div>
  );
};

export default Protected;
