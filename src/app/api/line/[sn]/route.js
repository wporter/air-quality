/* eslint-disable camelcase */
import { api } from "@/utils/api";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { sn } }) => {
  const { data } = await api(
    "GET",
    `https://api.quant-aq.com/device-api/v1/devices/${sn}/data`,
    {
      Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
    },
  );

  const PM1 = [];
  const PM10 = [];
  const PM25 = [];

  data.forEach(({ pm1, pm25, pm10, timestamp }) => {
    const local =
      new Date(timestamp).getTime() - new Date().getTimezoneOffset() * 60000;

    PM1.push({ x: local, y: pm1 });
    PM10.push({ x: local, y: pm10 });
    PM25.push({ x: local, y: pm25 });
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
