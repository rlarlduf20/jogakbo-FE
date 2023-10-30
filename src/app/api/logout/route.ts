import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const { jogakTokens } = await getServerSession(authOptions);

  const res = await fetch(`${process.env.SERVER_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jogakTokens.accessToken}`,
    },
  });

  return NextResponse.json(res);
}
