import Modal from "@/components/Modal";
import AlbumDetailSection from "@/templates/AlbumDetailSection";

const AlbumDetailModalPage = ({ params }: { params: { id: string } }) => {
  return (
    <Modal>
      <AlbumDetailSection albumID={params.id} />
    </Modal>
  );
};

export default AlbumDetailModalPage;
