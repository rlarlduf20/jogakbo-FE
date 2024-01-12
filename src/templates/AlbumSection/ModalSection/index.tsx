import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import RouteTrapezoidIcon from "../../../../public/images/svg/route-trapezoid.svg";

interface ModalProps {
  children: React.ReactNode;
}

const AlbumModal = ({ children }: ModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex gap-[3px]">
        <Image src={RouteTrapezoidIcon} alt="사다리꼴 아이콘" />
        <p>정보</p>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 bg-black/70" />
      <Dialog.DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
        <Dialog.Close>닫기</Dialog.Close>
      </Dialog.DialogContent>
    </Dialog.Root>
  );
};

export default AlbumModal;
