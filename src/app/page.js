"use client";
import Welcome from "@/components/Welcome";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const Page = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get("/api/locations")
      .then((response) => setLocations(response.data.items.data));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Welcome />
      <Map markers={locations} />
    </div>
  );
};

export default Page;
