import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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

export async function DELETE(
  request: Request,
  { params }: { params: { albumID: string } }
) {
  const { jogakTokens } = await getServerSession(authOptions);
  const { pageNum, imageUUID } = await request.json();
  const albumID = params.albumID;

  const res = await fetch(
    `${process.env.SERVER_URL}/album/img/${albumID}/${pageNum}?imageUUID=${imageUUID}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jogakTokens.accessToken}`,
      },
    }
  );

  return res;
}
