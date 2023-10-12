import { getServerSession } from "next-auth";
import LandingPage from "../templates/landing";
import MainPage from "../templates/main";

const HomePage = async () => {
  const session = await getServerSession();
  return <>{session ? <MainPage /> : <LandingPage />}</>;
};

export default HomePage;
