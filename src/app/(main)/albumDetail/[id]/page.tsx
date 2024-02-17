import AlbumDetailSection from "@/templates/AlbumDetailSection";

const AlbumDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <section className="pt-[120px] flex items-center justify-center">
      <AlbumDetailSection albumID={params.id} />
    </section>
  );
};

export default AlbumDetailPage;
