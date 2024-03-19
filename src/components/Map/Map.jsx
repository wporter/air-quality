"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Content"), {
  ssr: false,
});

export const ArcGIS = dynamic(() => import("./ArcGIS"), {
  ssr: false,
});

export default Map;
