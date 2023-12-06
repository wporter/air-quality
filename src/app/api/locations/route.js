import { NextResponse } from "next/server";

export const GET = async () => {
  const response = await fetch(
    "https://api.quant-aq.com/device-api/v1/devices?network_id=11",
    {
      auth: {
        username: process.env.QUANTAQ_API_KEY,
        password: "",
      },
    },
  );

  console.log(response);

  return NextResponse.json({ items: [] }, { status: 200 });
};
