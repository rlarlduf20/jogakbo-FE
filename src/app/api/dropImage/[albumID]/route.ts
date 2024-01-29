import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { albumID: string } }
) {
  const { jogakTokens } = await getServerSession(authOptions);
  const formData = await request.formData();
  const albumID = params.albumID;

  const res = await fetch(`${process.env.SERVER_URL}/album/img/${albumID}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${jogakTokens.accessToken}`,
    },
  });

  return res;
}
