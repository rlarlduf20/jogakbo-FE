import UserAlbums from "./components/UserAlbums";
import UserProfile from "./components/UserProfile";

const MainSection = async () => {
  return (
    <section className="flex pt-[40px] gap-[127px]">
      <UserProfile />
      <UserAlbums />
    </section>
  );
};

export default MainSection;
