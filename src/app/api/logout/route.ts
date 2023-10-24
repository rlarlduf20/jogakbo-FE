import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const { accessToken } = await getServerSession(authOptions);

  const res = await fetch(`${process.env.SERVER_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("route handler:", res);
  return Response.json(res);
}
