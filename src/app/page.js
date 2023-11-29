"use client";
import { signIn } from "next-auth/react";
import Welcome from "components/Welcome.jsx";

const Page = () => {
  return (
    <div className="m-0 p-0 h-screen overflow-hidden">
      {/* Project title */}
      <title>Omega Initiative</title>

      {/* Nav Bar Component - placeholder after sharan finishes */}
      <div className="flex justify-between p-5 bg-gray-500">
        <p className="text-air-green">Air Nav Bar!</p>
        <button onClick={() => signIn("google")}>Sign in</button>
      </div>

      {/* welcome page component */}
      <div>
        <Welcome />
      </div>
    </div>
  );
};

export default Page;
