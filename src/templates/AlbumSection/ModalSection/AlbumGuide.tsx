import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

import AlbumGuideImage from "../../../../public/images/album-guide.png";

import { TrapeButton } from "@/components/Trapezoid";

const AlbumGuide = () => {
  return (
    <>
      <section className="flex pl-[24px] mt-[74px]">
        <Image
          src={AlbumGuideImage}
          alt="가이드 이미지"
          width={683}
          height={239}
        />
      </section>
      <footer className="flex justify-center mt-[92px]">
        <Dialog.Close>
          <TrapeButton>시작</TrapeButton>
        </Dialog.Close>
      </footer>
    </>
  );
};
export default AlbumGuide;
