import Link from "next/link";
import Image from "next/image";
import AlbumLogoIcon from "../../../public/images/svg/album-logo.svg";
import MyJogakboIcon from "../../../public/images/svg/my-jogakbo.svg";
import ModalSection from "./ModalSection";
import TypeInfo from "./ModalSection/TypeInfo";
import TypeMembers from "./ModalSection/TypeMembers";
import useHoverText from "@/hooks/useHoverText";
import HoverText from "@/components/HoverText";
import AlbumGuide from "./ModalSection/AlbumGuide";

interface InfoPropType {
  albumID: string;
  title: string;
}

const AlbumInfo = ({ albumID, title }: InfoPropType) => {
  const { isHoverIcon, handleIsHoverToFalse, handleIsHoverToTrue } =
    useHoverText();

  return (
    <>
      <header className="h-[80px] flex items-center">
        <Image src={AlbumLogoIcon} alt="앨범 로고 아이콘" />
        <div className="grow ml-[11px] text-[20px]">{title}</div>
        <div className="mr-[30px]">
          <ModalSection type="도움말">
            <AlbumGuide />
          </ModalSection>
        </div>
        <div className="mr-[30px]">
          <ModalSection type="정보">
            <TypeInfo albumID={albumID} />
          </ModalSection>
        </div>
        <div className="mr-[30px]">
          <ModalSection type="구성원">
            <TypeMembers albumID={albumID} />
          </ModalSection>
        </div>
        <div className="relative whitespace-nowrap">
          <Link
            href="/"
            onMouseOver={handleIsHoverToTrue}
            onMouseLeave={handleIsHoverToFalse}
          >
            <Image src={MyJogakboIcon} alt="내 조각보 아이콘" />
          </Link>
          {isHoverIcon && <HoverText>내 조각보</HoverText>}
        </div>
      </header>
    </>
  );
};

export default AlbumInfo;
