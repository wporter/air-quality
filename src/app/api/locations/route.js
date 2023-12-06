import { api } from "@/app/utils/api";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { data, meta } = await api(
    "GET",
    "https://api.quant-aq.com/device-api/v1/devices?network_id=11",
    {
      Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
    },
  );

  return NextResponse.json({ data, meta }, { status: 200 });
};
