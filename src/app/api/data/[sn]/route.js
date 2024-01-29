import { api } from "@/utils/api";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { sn } = params;

  const { data, meta } = await api(
    "GET",
    `https://api.quant-aq.com/device-api/v1/data/most-recent/?sn=${sn}`,
    {
      Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
    }
  );

  return NextResponse.json({ data, meta }, { status: 200 });
};
