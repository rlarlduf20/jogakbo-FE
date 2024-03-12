import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const { jogakTokens } = await getServerSession(authOptions);

  const res = await fetch(
    `${process.env.SERVER_URL}/user/tutorial-completion`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jogakTokens.accessToken}`,
      },
    }
  );

  return res;
}
