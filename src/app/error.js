"use client";
import Error from "@/components/Error";

export default function InternalError({
  error: { statusCode, errorName, errorMsg },
}) {
  return <Error code={statusCode} error={errorName} message={errorMsg} />;
}
