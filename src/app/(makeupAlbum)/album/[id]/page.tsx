import dynamic from "next/dynamic";

const AlbumPage = async ({ params }: { params: { id: string } }) => {
  const AlbumComponent = dynamic(() => import("@/templates/AlbumSection"), {
    ssr: false,
  });
  return <AlbumComponent params={params} />;
};

export default AlbumPage;
