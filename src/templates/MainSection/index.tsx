import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import UserAlbums from "@/templates/MainSection/UserAlbums";
import UserProfile from "@/templates/MainSection/UserProfile";

const getUser = async () => {
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

const MainSection = async () => {
  const user = await getUser();

  return (
    <section className="flex pt-[40px] gap-[127px]">
      <UserProfile user={user} />
      <UserAlbums albums={user.albums} />
    </section>
  );
};

export default MainSection;
