"use client";
import Welcome from "@/components/Welcome";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
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
    <div className="flex flex-col justify-center items-center relative">
      <Welcome />
      <div className="text-5xl font-bold my-10 text-left w-11/12">
        <p className="my-4">Public View</p>
        <Map height="h-[60vh]" width="w-full" markers={markers} />
      </div>
    </div>
  );
};

export default Page;
