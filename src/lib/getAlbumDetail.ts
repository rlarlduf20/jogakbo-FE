import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getAlbumInfo = async (albumID: string) => {
  const { jogakTokens } = await getServerSession(authOptions);

  const res = await fetch(`${process.env.SERVER_URL}/album/${albumID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jogakTokens.accessToken}`,
    },
  });
  const albumInfo = await res.json();

  return albumInfo;
};
