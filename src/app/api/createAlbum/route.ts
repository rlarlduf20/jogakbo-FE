import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const { jogakTokens } = await getServerSession(authOptions);
  const { title } = await request.json();

  const res = await fetch(
    `${process.env.SERVER_URL}/album?albumName=${title}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jogakTokens.accessToken}`,
      },
    }
  );
  console.log(res);

  return res;
}
