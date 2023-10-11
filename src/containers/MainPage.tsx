import { getServerSession } from "next-auth";

const MainPage = async () => {
  const session = await getServerSession();
  return <>{session?.user?.name}</>;
};

export default MainPage;
