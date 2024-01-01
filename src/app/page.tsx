import { getServerSession } from "next-auth";
import LandingSection from "@/templates/LandingSection";
import MainSection from "@/templates/MainSection";

const HomePage = async () => {
  const session = await getServerSession();
  return <>{session ? <MainSection /> : <LandingSection />}</>;
};

export default HomePage;
