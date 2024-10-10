import IntroModal from "@/components/IntroModal";
import { getUser } from "@/lib/user/getUser";
import UserAlbums from "@/templates/MainSection/UserAlbums";
import UserProfile from "@/templates/MainSection/UserProfile";

const MainSection = async () => {
  const { userInfo, userAlbumList } = await getUser();

  return (
    <section className="relative flex pt-[40px] gap-[229px]">
      <IntroModal role={userInfo.role} />
      <UserProfile info={userInfo} albumList={userAlbumList} />
      <UserAlbums albumList={userAlbumList} />
    </section>
  );
};

export default MainSection;
