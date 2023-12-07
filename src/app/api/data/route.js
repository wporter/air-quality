/* eslint-disable camelcase */
import { api } from "@/app/utils/api";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { data } = await api(
    "GET",
    "https://api.quant-aq.com/device-api/v1/devices/MOD-PM-00407/data",
    // "https://api.quant-aq.com/device-api/v1/devices/MOD-PM-00407/data-by-date/2023-12-01",
    {
      Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
    },
  );

  const PM1 = [];
  const PM10 = [];
  const PM25 = [];

  data.forEach(({ pm1, pm25, pm10, timestamp_local }) => {
    PM1.push({ x: timestamp_local, y: pm1 });
    PM10.push({ x: timestamp_local, y: pm10 });
    PM25.push({ x: timestamp_local, y: pm25 });
  });

  return NextResponse.json(
    {
      PM1: PM1.reverse(),
      PM10: PM10.reverse(),
      PM25: PM25.reverse(),
    },
    { status: 200 },
  );
};
