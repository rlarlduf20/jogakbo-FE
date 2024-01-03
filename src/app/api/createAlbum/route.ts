import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const { jogakTokens } = await getServerSession(authOptions);
  const data = await request.json();

  const res = await fetch(`${process.env.SERVER_URL}/album`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jogakTokens.accessToken}`,
    },
    body: JSON.stringify({
      title: data.title,
    }),
  });
  return NextResponse.json(res);
}
