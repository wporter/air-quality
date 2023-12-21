/* eslint-disable camelcase */
import { api } from "@/app/utils/api";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { sn } }) => {
  const { data } = await api(
    "GET",
    `https://api.quant-aq.com/device-api/v1/devices/${sn[0]}/data?limit=1&sort=timestamp,desc`,
    {
      Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
    },
  );

  return NextResponse.json({ items: data[0] }, { status: 200 });
};
