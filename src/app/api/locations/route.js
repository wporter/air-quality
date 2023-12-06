import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async () => {
  const res = NextResponse;

  const org = await axios.get(
    "https://api.quant-aq.com/device-api/v1/devices?network_id=11",
    {
      auth: {
        username: process.env.QUANTAQ_API_KEY,
        password: "",
      },
    },
  );

  return res.json({ items: org.data }, { status: 200 });
};
