import Link from "next/link";
import Image from "next/image";
import RouteTrapezoidIcon from "../../../public/images/svg/route-trapezoid.svg";
import AlbumLogoIcon from "../../../public/images/svg/album-logo.svg";
import ModalSection from "./ModalSection";
import TypeInfo from "./ModalSection/TypeInfo";
import TypeMembers from "./ModalSection/TypeMembers";

interface InfoPropType {
  page: number;
  movePrevPage: () => void;
  moveNextPage: () => void;
}

const AlbumInfo = ({ page, movePrevPage, moveNextPage }: InfoPropType) => {
  return (
    <>
      <header className="h-[80px] flex items-center">
        <Image src={AlbumLogoIcon} alt="앨범 로고 아이콘" />
        <div className="grow ml-[11px] text-[20px]">
          {"제목이 들어갈 자리입니다"}
        </div>
        <div className="mr-[61px]">
          <ModalSection type="정보">
            <TypeInfo />
          </ModalSection>
        </div>
        <div className="mr-[47px]">
          <ModalSection type="구성원">
            <TypeMembers />
          </ModalSection>
        </div>
        <div className="flex">
          <Image src={RouteTrapezoidIcon} alt="사다리꼴 아이콘" />
          <Link href="/" className="ml-[3px]">
            내 조각보
          </Link>
        </div>
      </header>
      <button
        className={`absolute left-[-50px] top-[410px] ${
          page > 0 && "hover:cursor-pointer"
        } ${page <= 0 && "text-red-500"}`}
        disabled={page <= 0}
        onClick={movePrevPage}
      >
        이전
      </button>
      <button
        className="absolute right-[-50px] top-[410px] hover:cursor-pointer"
        onClick={moveNextPage}
      >
        다음
      </button>
    </>
  );
};

export default AlbumInfo;
