"use client";
import dynamic from "next/dynamic";

export const ArcGIS = dynamic(() => import("./ArcGIS"), {
  ssr: false,
});

export default ArcGIS;
