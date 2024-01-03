import UserAlbums from "@/templates/MainSection/UserAlbums";
import UserProfile from "@/templates/MainSection/UserProfile";

const MainSection = async () => {
  return (
    <section className="flex pt-[40px] gap-[127px]">
      <UserProfile />
      <UserAlbums />
    </section>
  );
};

export default MainSection;
