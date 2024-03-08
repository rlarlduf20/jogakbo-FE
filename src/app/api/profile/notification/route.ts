import { NextResponse } from "next/server";
import { getUser } from "@/lib/user/getUser";

export async function GET() {
  const { userNotification } = await getUser();
  console.log(userNotification);
  return NextResponse.json(userNotification);
}
