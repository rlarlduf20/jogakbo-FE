import AlbumDetailSection from "@/templates/AlbumDetailSection";

const AddMatePage = ({ params }: { params: { id: string } }) => {
  return (
    <section className="pt-[120px] flex items-center justify-center">
      <AlbumDetailSection albumID={params.id} />
    </section>
  );
};

export default AddMatePage;
