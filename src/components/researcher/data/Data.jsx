"use client";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import Details from "./Details";

const Data = ({ params }) => {
  const { sn } = params;

  const [fields, setFields] = useState({});

  const load = () => {
    setFields({});
    api("GET", `/api/data/${sn}`).then(({ data }) => {
      const {
        rh,
        sn,
        temp,
        // eslint-disable-next-line camelcase
        timestamp,
        co,
        co2,
        no,
        no2,
        o3,
        pm1,
        pm10,
        pm25,
      } = data[0];
      setFields({
        "Serial Number": sn,
        "Relative Humidity": rh,
        Temperature: temp,
        // eslint-disable-next-line camelcase
        Timestamp: new Date(timestamp).toLocaleTimeString(),
        "Carbon Monoxide": co,
        "Carbon Dixiode": co2,
        "Nitric Oxide": no,
        "Nitrogen Dioxide": no2,
        Ozone: o3,
        "PM 1": pm1,
        "PM 2.5": pm25,
        "PM 10": pm10,
      });
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="">
      <Details fields={fields} refresh={() => load()} />
    </div>
  );
};

export default Data;
