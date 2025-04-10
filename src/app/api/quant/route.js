// route.js
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // 1. Grab any query params
    const { searchParams } = new URL(req.url);
    const sn = searchParams.get("sn") || "MOD-00282";

    // 2. Prepare Basic Auth
    const authHeader = "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`);

    // 3. Fetch from external API
    const response = await fetch(
      `https://api.quant-aq.com/device-api/v1/devices/${sn}/data/`,
      {
        headers: {
          Authorization: authHeader,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch external data" },
        { status: response.status },
      );
    }

    // 4. Parse the JSON
    const json = await response.json();
    console.log("External API raw response:", json);

    // 5. The actual array you need:
    const array = json.data || []; // the array is in `data` property
    // If you prefer to return the entire object, that's fine, but then your client code must handle it.

    // 6. Return the array to the client under the key "data"
    return NextResponse.json({ data: array }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
