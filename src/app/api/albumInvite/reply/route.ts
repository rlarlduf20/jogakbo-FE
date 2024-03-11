import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const { jogakTokens } = await getServerSession(authOptions);
  const { albumID, responseType } = await request.json();
  console.log(albumID, responseType);
  const res = await fetch(
    `${process.env.SERVER_URL}/album/${albumID}/invitation-reply?reply=${responseType}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jogakTokens.accessToken}`,
      },
    }
  );

  return res;
}
