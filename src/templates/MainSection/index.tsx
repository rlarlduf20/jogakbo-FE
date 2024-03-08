import UserAlbums from "@/templates/MainSection/UserAlbums";
import UserProfile from "@/templates/MainSection/UserProfile";
import { getUser } from "@/lib/user/getUser";

const MainSection = async () => {
  const { userInfo, userAlbumList } = await getUser();

  return (
    <section className="flex pt-[40px] gap-[229px]">
      <UserProfile info={userInfo} albumList={userAlbumList} />
      <UserAlbums albumList={userAlbumList} />
    </section>
  );
};

export default MainSection;
