import Error from "@/components/Error";

// deals with the 404 page
const NotFound = () => {
  return <Error statusCode="404" errorName="Page Not Found." />;
};

export default NotFound;
