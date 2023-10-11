import { getServerSession } from "next-auth";
import LandingPage from "../containers/LandingPage";
import MainPage from "../containers/MainPage";

const HomePage = async () => {
  const session = await getServerSession();
  return <>{session ? <MainPage /> : <LandingPage />}</>;
};

export default HomePage;
