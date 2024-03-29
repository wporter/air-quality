import { getAuth } from "@/utils/api";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { username, password } = await req.json();

  const { members, error, message } = await getAuth(password);

  if (error === "unauthorized") {
    return NextResponse.json({ message }, { status: 201 });
  }

  const existingMember = members.some(({ user }) => user === username);

  if (existingMember)
    return NextResponse.json({ username, message: "ok" }, { status: 200 });

  return NextResponse.json({ message: "user not found" }, { status: 202 });
};
