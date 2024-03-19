"use client";
import { useContext } from "react";
import { User } from "../../app/hooks/Auth";
import SideNavigation from "./SideNavigation";
import Error from "../Error";

const Protected = ({ children }) => {
  const { user } = useContext(User);

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-grow overflow-auto">
        {user && (
          <div className="h-screen relative w-full">
            <div className="flex h-full">
              <SideNavigation />
              <div className="w-full">{children}</div>
            </div>
          </div>
        )}
        {!user && (
          <Error
            status="403"
            name="Not Authorized"
            message="Please sign in to access this page"
          />
        )}
      </div>
    </div>
  );
};

export default Protected;
