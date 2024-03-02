import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const { jogakTokens } = await getServerSession(authOptions);
  const { albumID } = await request.json();

  const res = await fetch(`${process.env.SERVER_URL}/album/${albumID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jogakTokens.accessToken}`,
    },
  });

  return res;
}

export async function PUT(request: Request) {
  const { jogakTokens } = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const albumID = searchParams.get("albumID");
  const newTitle = searchParams.get("newTitle");
  const formData = await request.formData();

  const res = await fetch(
    `${process.env.SERVER_URL}/album/${albumID}?newAlbumName=${newTitle}`,
    {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${jogakTokens.accessToken}`,
      },
    }
  );

  return res;
}

export async function DELETE(request: Request) {
  const { jogakTokens } = await getServerSession(authOptions);
  const { albumID } = await request.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/album/${albumID}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jogakTokens.accessToken}`,
      },
    }
  );

  return res;
}
