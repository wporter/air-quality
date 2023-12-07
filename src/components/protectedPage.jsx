"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

const ProtectedPage = ({ fallback, unauthenticatedComponent, children }) => {
  const { status } = useSession();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setConfirmed(true);
    }
  }, [status]);

  if (status === "loading") {
    return fallback ? fallback : <></>;
  } else if (status === "unauthenticated") {
    if (unauthenticatedComponent) {
      return <>{unauthenticatedComponent}</>;
    } else {
      return (
        <>
          <p>{"You are not authorized to view this resource. "}</p>
          <button
            onClick={() => {
              void signIn("google");
            }}
          >
            Sign In
          </button>
        </>
      );
    }
  }

  if (confirmed) {
    return children;
  }
};

export default ProtectedPage;
