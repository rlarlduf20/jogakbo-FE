import { getServerSession } from "next-auth";
import MainNav from "./MainNav";
import LandingNav from "./LandingNav";

const Header = async () => {
  const session = await getServerSession();
  return (
    <header className="w-full flex justify-center">
      {session ? <MainNav /> : <LandingNav />}
    </header>
  );
};

export default Header;
