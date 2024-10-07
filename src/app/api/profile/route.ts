import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";

import { getUser } from "@/lib/user/getUser";

export async function GET() {
  const res = await getUser();
  // console.log(res);
  return NextResponse.json(res);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  const formData = await request.formData();
  // console.log(formData);
  const res = await fetch(`${process.env.SERVER_URL}/user`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.jogakTokens.accessToken}`,
    },
  });
  return NextResponse.json(res);
}
