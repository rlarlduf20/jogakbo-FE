import UserAlbums from "@/components/main/UserAlbums";
import UserProfile from "@/components/main/UserProfile";

const MainSection = async () => {
  return (
    <section className="flex pt-[40px] gap-[127px]">
      <UserProfile />
      <UserAlbums />
    </section>
  );
};

export default MainSection;
