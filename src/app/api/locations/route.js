import { NextResponse } from "next/server";

export const GET = async () => {
  const response = await fetch(
    "https://api.quant-aq.com/device-api/v1/devices?network_id=11",
    {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
      },
    },
  );

  const data = await response.json();

  return NextResponse.json({ items: data }, { status: 200 });
};
