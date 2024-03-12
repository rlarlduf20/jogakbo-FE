import UserAlbums from "@/templates/MainSection/UserAlbums";
import UserProfile from "@/templates/MainSection/UserProfile";
import { getUser } from "@/lib/user/getUser";
import IntroModal from "@/components/IntroModal";

const MainSection = async () => {
  const { userInfo, userAlbumList } = await getUser();
  console.log(userInfo);
  return (
    <section className="relative flex pt-[40px] gap-[229px]">
      <IntroModal role={userInfo.role} />
      <UserProfile info={userInfo} albumList={userAlbumList} />
      <UserAlbums albumList={userAlbumList} />
    </section>
  );
};

export default MainSection;
