"use client";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import Details from "./Details";
import Line from "./Line";

const Data = ({ params }) => {
  const { sn } = params;

  const [fields, setFields] = useState({});

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

  const loadData = async () => {
    const { PM1, PM10, PM25 } = await api("GET", `/api/line/${sn}`);

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
        "Relative Humidity": `${rh}%`,
        Temperature: `${temp}°C`,
        // eslint-disable-next-line camelcase
        Timestamp: new Date(
          new Date(timestamp).getTime() -
            new Date().getTimezoneOffset() * 60000,
        ).toLocaleTimeString(),
        "Carbon Monoxide": `${co} ppb`,
        "Carbon Dixiode": `${co2} ppm`,
        "Nitric Oxide": `${no} ppb`,
        "Nitrogen Dioxide": `${no2} ppb`,
        Ozone: `${o3} ppb`,
        "PM 1": `${pm1} μg/m³`,
        "PM 2.5": `${pm25} μg/m³`,
        "PM 10": `${pm10} μg/m³`,
      });
    });
  };

  useEffect(() => {
    load();
    loadData();
  }, []);

  return (
    <div className="flex">
      <Details fields={fields} refresh={() => load()} />
      <div className="h-full w-full flex flex-wrap">
        <Line
          data={data}
          title="Particulate Matter"
          units="particles per something something"
        />
        <Line data={data} title="Gases" units="particles per billion" />
        <Line
          data={data}
          title="Other Information"
          units="particles per something something"
        />
        <Line
          data={data}
          title="Particulate Matter"
          units="particles per something something"
        />
        <Line data={data} title="Gases" units="particles per billion" />
        <Line
          data={data}
          title="Other Information"
          units="particles per something something"
        />
        <Line
          data={data}
          title="Particulate Matter"
          units="particles per something something"
        />
        <Line data={data} title="Gases" units="particles per billion" />
        <Line
          data={data}
          title="Other Information"
          units="particles per something something"
        />
      </div>
    </div>
  );
};

export default Data;
