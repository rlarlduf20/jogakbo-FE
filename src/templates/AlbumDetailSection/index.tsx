import { getAlbumInfo } from "@/lib/getAlbumDetail";
import RouteButtons from "./RouteButtons";
import Image from "next/image";
import ModalLogoIcon from "../../../public/images/svg/album-modal-logo.svg";
import MembersLogoIcon from "../../../public/images/svg/members-logo.svg";

interface AlbumDetailSectionPropsType {
  albumID: string;
}

const AlbumDetailSection = async ({ albumID }: AlbumDetailSectionPropsType) => {
  const { albumName, thumbnailImageURL, createdDate, memberCount, imageCount } =
    await getAlbumInfo(albumID);
  const createdDateFormat =
    createdDate.slice(0, 4) +
    "." +
    createdDate.slice(5, 7) +
    "." +
    createdDate.slice(8, 10);

  return (
    <div
      className="flex flex-col items-center w-[420px] h-[640px] 
      border-[1px] border-white bg-main_black 
      pt-[23px] px-[40px] pb-[27px]"
    >
      <div className="flex w-full gap-[6px] mb-[42px]">
        <Image src={ModalLogoIcon} alt="로고" />
        <p className="text-[20px] font-semibold">조각보</p>
      </div>
      <div className="relative w-[200px] h-[280px] bg-white mb-[26px]">
        {thumbnailImageURL && (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}${albumID}/${thumbnailImageURL}`}
            alt="thumbnail"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        )}
      </div>
      <div className="text-center mb-[23px]">
        <p className="text-[20px] font-semibold mb-[4px]">{albumName}</p>
        <p className="text-[14px]">{createdDateFormat}</p>
      </div>
      <div className="w-[200px] flex gap-[4px] mb-[22px]">
        <Image src={MembersLogoIcon} alt="로고" />
        <p className="grow">구성원</p>
        <p>{memberCount}</p>
      </div>
      <div className="w-[200px] flex gap-[4px] mb-[44px]">
        <div className="w-[24px]">
          <div className="[clipPath:polygon(0%_0%,70%_0%,100%_100%,0%_100%)] bg-white w-[14px] h-[24px] mx-auto" />
        </div>
        <p className="grow">조각</p>
        <p>{imageCount}</p>
      </div>
      <RouteButtons albumID={albumID} />
    </div>
  );
};

export default AlbumDetailSection;
