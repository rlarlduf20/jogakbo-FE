import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProtectedPage = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return <>이곳은 로그인 후에 들어올 수 있습니다.</>;
};

export default ProtectedPage;
