import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import RouteTrapezoidIcon from "../../../../public/images/svg/route-trapezoid.svg";
import ModalLogoIcon from "../../../../public/images/svg/album-modal-logo.svg";
import { TrapeButton } from "@/components/Trapezoid";

interface ModalProps {
  children: React.ReactNode;
  type: string;
  isEditStat?: boolean;
  toggleEditStat?: any;
  handleSubmitEdit?: any;
}

const AlbumModal = ({
  children,
  type,
  isEditStat,
  toggleEditStat,
  handleSubmitEdit,
}: ModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex gap-[3px]">
        <Image src={RouteTrapezoidIcon} alt="사다리꼴 아이콘" />
        <p>{type}</p>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed z-30 inset-0 bg-black/70" />
      <Dialog.DialogContent className="z-30 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="relative w-[800px] h-[500px] bg-main_black border-[1px] border-white 
        pt-[23px] pl-[30px] pr-[40px]"
        >
          <header className="flex items-center gap-[6px] pb-[42px]">
            <Image src={ModalLogoIcon} alt="로고" />
            <p className="font-semibold text-[20px] mr-[10px]">조각보 {type}</p>
            {type === "정보" && !isEditStat && (
              <div
                className="text-[14px] underline cursor-pointer"
                onClick={toggleEditStat}
              >
                수정하기
              </div>
            )}
          </header>
          {children}
          <footer className="flex justify-center gap-[30px] pt-[20px]">
            {isEditStat ? (
              <>
                <TrapeButton type="outline" handleClick={toggleEditStat}>
                  수정 종료
                </TrapeButton>
                <TrapeButton handleClick={handleSubmitEdit}>수정</TrapeButton>
              </>
            ) : (
              <>
                <Dialog.Close>
                  <TrapeButton type="outline">닫기</TrapeButton>
                </Dialog.Close>
              </>
            )}
          </footer>
        </div>
      </Dialog.DialogContent>
    </Dialog.Root>
  );
};

export default AlbumModal;
