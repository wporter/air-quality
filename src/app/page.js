"use client";
import Welcome from "@/components/Welcome";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { api } from "./utils/api";
import Line from "@/components/charts/Line";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const Page = () => {
  const [markers, setMarkers] = useState({
    markers: [],
    total: 0,
  });
  const [data, setData] = useState({
    PM1: {
      points: [],
      stroke: "#FF0000",
    },
    PM10: {
      points: [],
      stroke: "#00FF00",
    },
    PM25: {
      points: [],
      stroke: "#0000FF",
    },
  });
  const [markerTable, setMarkerTable] = useState(null);

  useEffect(() => {
    const loadMarkers = async () => {
      const { data, meta } = await api("GET", "/api/locations");
      setMarkers({
        markers: data,
        total: meta.total,
      });
    };

    const loadData = async () => {
      const { PM1, PM10, PM25 } = await api("GET", `/api/line/MOD-00285`);

      setData({
        PM1: {
          points: PM1,
          stroke: "#FF0000",
          key: "PM1",
        },
        PM10: {
          points: PM10,
          stroke: "#00FF00",
          key: "PM10",
        },
        PM25: {
          points: PM25,
          stroke: "#0000FF",
          key: "PM25",
        },
      });
    };

    loadMarkers();
    loadData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center relative">
      <Welcome />
      <div className="my-10 text-left w-11/12">
        <p className="mt-4 text-5xl font-bold">Public View</p>
        <p className="text-gray-400 my-2">viewing {markers.total} sensors</p>
        <Map markers={markers.markers} setData={setMarkerTable} />
      </div>

      <div>{JSON.stringify(markerTable)}</div>

      <Line data={data} />
    </div>
  );
};

export default Page;
