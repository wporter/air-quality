"use client";
import Error from "@/components/Error";

export default function InternalError({ code, name, message }) {
  return <Error code={code} error={name} message={message} />;
}
