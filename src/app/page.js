"use client";
import Welcome from "@/components/Welcome";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { api } from "./utils/api";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const Page = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const loadMarkers = async () => {
      const { data } = await api("GET", "/api/locations");
      setMarkers(data);
    };

    loadMarkers();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Welcome />
      <Map markers={markers} />
    </div>
  );
};

export default Page;
