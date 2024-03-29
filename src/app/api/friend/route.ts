import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const { jogakTokens } = await getServerSession(authOptions);
  const { userID } = await request.json();

  const res = await fetch(
    `${process.env.SERVER_URL}/user/friend-request/${userID}`,
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

export async function DELETE(request: Request) {
  const { jogakTokens } = await getServerSession(authOptions);
  const { userID } = await request.json();

  const res = await fetch(`${process.env.SERVER_URL}/user/friend/${userID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jogakTokens.accessToken}`,
    },
  });

  return res;
}
