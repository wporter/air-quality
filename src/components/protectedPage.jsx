import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { authenticate } from "@/app/utils/authenticate";

const ProtectedPage = ({ fallback, unauthenticatedComponent, children }) => {
  const [authResult, setAuthResult] = useState(null);

  useEffect(() => {
    const auth = async () => {
      const res = await authenticate();
      return res;
    };

    if (authResult === null) {
      auth().then((res) => {
        setAuthResult(res);
      });
    }
  }, [authResult]);

  if (authResult === null) {
    return fallback ? fallback : <></>;
  } else if (authResult.auth === 200) {
    return children;
  } else {
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
};

export default ProtectedPage;
