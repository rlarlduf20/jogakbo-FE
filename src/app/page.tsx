import { getServerSession } from "next-auth";
import LandingSection from "../templates/landing";
import MainSection from "../templates/main";

const HomePage = async () => {
  const session = await getServerSession();
  return <>{session ? <MainSection /> : <LandingSection />}</>;
};

export default HomePage;
