import { getUser } from "@/lib/user/getUser";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await getUser();
  // console.log(res);
  return NextResponse.json(res);
}
