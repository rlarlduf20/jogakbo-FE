import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getUser = async () => {
  const { jogakTokens } = await getServerSession(authOptions);
  const res = await fetch(`${process.env.SERVER_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jogakTokens.accessToken}`,
    },
  });
  const user = await res.json();
  console.log("user", user);
  const userInfo = {
    userUUID: user.userUUID,
    nickname: user.nickname,
    profileImageURL: user.profileImageURL,
    friends: user.friends,
  };
  const userAlbumList = {
    albums: user.albums,
    collaboAlbums: user.collaboAlbums,
  };
  const userNotification = {
    friendRequesters: user.friendRequesters,
    albumInviters: user.albumInviters,
  };
  return { userInfo, userAlbumList, userNotification };
};
