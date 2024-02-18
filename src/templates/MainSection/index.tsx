import UserAlbums from "@/templates/MainSection/UserAlbums";
import UserProfile from "@/templates/MainSection/UserProfile";
import { getUser } from "@/lib/user/getUser";

const MainSection = async () => {
  const user = await getUser();

  return (
    <section className="flex pt-[40px] gap-[229px]">
      <UserProfile user={user} />
      <UserAlbums albums={user.albums} />
    </section>
  );
};

export default MainSection;
