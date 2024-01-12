import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import RouteTrapezoidIcon from "../../../../public/images/svg/route-trapezoid.svg";
import ModalLogoIcon from "../../../../public/images/svg/album-modal-logo.svg";

interface ModalProps {
  children: React.ReactNode;
  type: string;
}

const AlbumModal = ({ children, type }: ModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex gap-[3px]">
        <Image src={RouteTrapezoidIcon} alt="사다리꼴 아이콘" />
        <p>{type}</p>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 bg-black/70" />
      <Dialog.DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-[800px] h-[500px] bg-main_black border-[1px] border-white 
        pt-[23px] pl-[30px] pr-[40px]"
        >
          <header className="flex gap-[6px] pb-[42px]">
            <Image src={ModalLogoIcon} alt="로고" />
            <p className="font-semibold text-[20px]">조각보 {type}</p>
          </header>
          {children}
          <Dialog.Close>닫기</Dialog.Close>
        </div>
      </Dialog.DialogContent>
    </Dialog.Root>
  );
};

export default AlbumModal;
