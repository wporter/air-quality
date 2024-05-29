import Error from "@/components/Error";

const NotFound = () => {
  return (
    <Error
      status="404"
      name="Page Not Found"
      message="The page does not exist"
    />
  );
};

export default NotFound;
