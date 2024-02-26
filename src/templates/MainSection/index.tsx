import UserAlbums from "@/templates/MainSection/UserAlbums";
import UserProfile from "@/templates/MainSection/UserProfile";
import { getUser } from "@/lib/user/getUser";

const MainSection = async () => {
  const user = await getUser();
  const entireAlbumList = user.albums.concat(user.collaboAlbums);

  return (
    <section className="flex pt-[40px] gap-[229px]">
      <UserProfile user={user} />
      <UserAlbums albums={entireAlbumList} />
    </section>
  );
};

export default MainSection;
