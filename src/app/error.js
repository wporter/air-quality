"use client";
import Error from "@/components/Error";

const error = ({ error: { status, name, message } }) => {
  return <Error status={status} name={name} message={message} />;
};

export default error;
