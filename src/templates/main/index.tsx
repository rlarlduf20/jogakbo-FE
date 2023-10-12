import { getServerSession } from "next-auth";

const MainPage = async () => {
  const session = await getServerSession();
  return <div className="text-xl font-bold">{session?.user?.name}</div>;
};

export default MainPage;
