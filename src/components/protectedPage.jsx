import { authenticate } from "@/app/utils/authenticate";

const ProtectedPage = async ({
  fallback,
  unauthenticatedComponent,
  children,
}) => {
  const authResult = await authenticate();

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
          <p>Not authenticated</p>
        </>
      );
    }
  }
};

export default ProtectedPage;
