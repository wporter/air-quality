"use client";
import { useRef, useEffect } from "react";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";

const ArcGIS = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      esriConfig.apiKey = process.env.NEXT_PUBLIC_ARCGIS_API_KEY;

      const map = new ArcGISMap({
        basemap: "gray-vector",
      });

      new MapView({
        map,
        container: mapDiv.current,
        center: [-117.5981, 34.056],
        zoom: 11,
      });
    }
  }, [mapDiv]);

  return <div className="m-0 p-0 w-full h-[90vh]" ref={mapDiv}></div>;
};

export default ArcGIS;
