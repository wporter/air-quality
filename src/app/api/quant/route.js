import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sn = searchParams.get("sn");

    if (!sn) {
      console.error("No serial number (sn) provided in query.");
      return NextResponse.json(
        { error: "Missing serial number" },
        { status: 400 },
      );
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const startDate = yesterday.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0];

    const authHeader = "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`);

    // ("About to fetch resampled data from QuantAQ:");
    // console.log("Serial Number (sn):", sn);
    // console.log("Start Date:", startDate);
    // console.log("End Date:", endDate);

    const response = await fetch(
      `https://api.quant-aq.com/v1/data/resampled/?sn=${sn}&start_date=${startDate}&end_date=${endDate}&period=1h`,
      {
        headers: {
          Authorization: authHeader,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `QuantAQ API returned error (${response.status}):`,
        errorText,
      );

      return NextResponse.json(
        { error: "QuantAQ API error", detail: errorText },
        { status: response.status },
      );
    }

    const json = await response.json();
    // console.log("Successfully fetched resampled data from QuantAQ:", json);

    return NextResponse.json({ data: json.data || [] }, { status: 200 });
  } catch (error) {
    console.error("Internal server error in /api/quant:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
