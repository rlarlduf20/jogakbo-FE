import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const MainPage = async () => {
  const session = await getServerSession(authOptions);

  return <div className="text-xl font-bold">{session?.user?.name}</div>;
};

export default MainPage;
