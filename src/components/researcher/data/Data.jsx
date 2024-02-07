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
        timestamp_local,
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
        rh: rh,
        temp: temp,
        // eslint-disable-next-line camelcase
        timestamp: timestamp_local,
        co: co,
        co2: co2,
        no: no,
        no2: no2,
        o3: o3,
        pm1: pm1,
        pm10: pm10,
        pm25: pm25,
      });
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <Details fields={fields} refresh={() => load()} />
    </div>
  );
};

export default Data;
