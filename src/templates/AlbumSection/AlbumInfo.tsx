import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RouteTrapezoidIcon from "../../../public/images/svg/route-trapezoid.svg";
import AlbumLogoIcon from "../../../public/images/svg/album-logo.svg";
import ModalSection from "./ModalSection";
import TypeInfo from "./ModalSection/TypeInfo";
import TypeMembers from "./ModalSection/TypeMembers";

interface InfoPropType {
  info: {
    albumName: string;
    createdDate: string;
    thumbnailImage: string;
  };
  albumID: string;
  title: string;
  thumbnail: any;
  page: number;
  albumSize: number;
  movePrevPage: () => void;
  moveNextPage: (isCreate: boolean) => void;
  setAlbumInfo: any;
}

const AlbumInfo = ({
  info,
  albumID,
  title,
  thumbnail,
  page,
  albumSize,
  movePrevPage,
  moveNextPage,
  setAlbumInfo,
}: InfoPropType) => {
  const [isEditStat, setIsEditStat] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<any>();

  const toggleEditStat = () => {
    setIsEditStat((prev) => !prev);
    setAlbumInfo((prev: any) => {
      return { ...prev, albumName: title, thumbnailImage: thumbnail };
    });
  };
  const handleChangeInput = (value: string) => {
    setAlbumInfo((prev: any) => {
      return { ...prev, albumName: value };
    });
  };
  const upLoadImage = (e: any) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);

    reader.onloadend = () => {
      setAlbumInfo((prev: any) => {
        return { ...prev, thumbnailImage: reader.result };
      });
      setImageFile(uploadFile);
    };
  };
  const handleSubmitEdit = async () => {
    const formData = new FormData();

    if (imageFile === undefined) {
      formData.append("thumbnailImage", "");
    } else {
      formData.append("thumbnailImage", imageFile);
    }

    const res = await fetch(
      `/api/albumInfo?albumID=${albumID}&newTitle=${info.albumName}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (res.ok) {
      alert("수정되었습니다.");
      setIsEditStat(false);
      return;
    }
    alert("수정 권한이 없습니다.");
  };

  return (
    <>
      <header className="h-[80px] flex items-center">
        <Image src={AlbumLogoIcon} alt="앨범 로고 아이콘" />
        <div className="grow ml-[11px] text-[20px]">{title}</div>
        <div className="mr-[61px]">
          <ModalSection
            type="정보"
            isEditStat={isEditStat}
            toggleEditStat={toggleEditStat}
            handleSubmitEdit={handleSubmitEdit}
          >
            <TypeInfo
              isEditStat={isEditStat}
              info={info}
              thumbnail={thumbnail}
              handleChangeInput={handleChangeInput}
              upLoadImage={upLoadImage}
            />
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
      {page + 1 === albumSize ? (
        <button
          className="absolute right-[-50px] top-[410px] hover:cursor-pointer"
          onClick={() => moveNextPage(true)}
        >
          생성
        </button>
      ) : (
        <button
          className="absolute right-[-50px] top-[410px] hover:cursor-pointer"
          onClick={() => moveNextPage(false)}
        >
          다음
        </button>
      )}
    </>
  );
};

export default AlbumInfo;
