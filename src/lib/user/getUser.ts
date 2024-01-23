import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getUser = async () => {
  const { jogakTokens } = await getServerSession(authOptions);
  const res = await fetch(`${process.env.SERVER_URL}/user/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jogakTokens.accessToken}`,
    },
  });
  const user = await res.json();

  return user;
};
