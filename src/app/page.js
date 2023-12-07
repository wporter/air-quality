"use client";
import Welcome from "@/components/Welcome";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { api } from "./utils/api";
import Line from "@/components/charts/Line";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const Page = () => {
  const [markers, setMarkers] = useState([]);
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

  useEffect(() => {
    const loadMarkers = async () => {
      const { data } = await api("GET", "/api/locations");
      setMarkers(data);
    };

    const loadData = async () => {
      const { PM1, PM10, PM25 } = await api("GET", "/api/data");
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
    <div className="flex flex-col justify-center items-center">
      <Welcome />
      <Map markers={markers} />
      <Line data={data} />
    </div>
  );
};

export default Page;
