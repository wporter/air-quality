import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ items: [] }, { status: 200 });
};
