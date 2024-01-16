import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const { jogakTokens } = await getServerSession(authOptions);

  const { debouncedSearchText } = await request.json();
  console.log(debouncedSearchText);
  const res = await fetch(
    `${process.env.SERVER_URL}/user/search?nickname=${debouncedSearchText}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jogakTokens.accessToken}`,
      },
    }
  );

  return res;
}
