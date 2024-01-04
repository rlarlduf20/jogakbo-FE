import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const AlbumPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  const AlbumComponent = dynamic(() => import("@/templates/AlbumSection"), {
    ssr: false,
  });
  return <AlbumComponent params={params} />;
};

export default AlbumPage;
