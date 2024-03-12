import Image from "next/image";
import { Trapezoid } from "@/components/Trapezoid";
import type { UserAlbumListType, UserInfoType } from "@/types";
import MateBox from "./MateBox";
import Link from "next/link";

interface UserProfileProps {
  info: UserInfoType;
  albumList: UserAlbumListType;
}

const UserProfile = async ({ info, albumList }: UserProfileProps) => {
  return (
    <div>
      <div className="w-[180px]">
        <div className="mb-[18px]">
          <Trapezoid
            styles={{
              width: "180px",
              height: "180px",
              clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
              bgColor: "white",
              position: "relative",
            }}
          >
            {info.profileImageURL && (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_URL}${info.userUUID}/${info.profileImageURL}`}
                alt="thumbnail"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            )}
          </Trapezoid>
        </div>
        <p className="text-[24px] font-semibold mb-[13px]">{info.nickname}</p>
        <div className="mb-[14px]">
          <div className="flex h-[20px] mb-[17px] items-center">
            <div className="[clipPath:polygon(0%_0%,70%_0%,100%_100%,0%_100%)] bg-white w-[10px] h-[20px] mr-[8px]" />
            <p className="grow">친구</p>
            <p>{info.friends.length}</p>
          </div>
          <div className="flex mb-[17px] items-center">
            <div className="[clipPath:polygon(0%_0%,70%_0%,100%_100%,0%_100%)] bg-white w-[10px] h-[20px] mr-[8px]" />
            <p className="grow">조각</p>
            <p>{"-"}</p>
          </div>
          <div className="flex items-center">
            <div className="[clipPath:polygon(0%_0%,70%_0%,100%_100%,0%_100%)] bg-white w-[10px] h-[20px] mr-[8px]" />
            <p className="grow">조각보</p>
            <p>{albumList.albums.length + albumList.collaboAlbums.length}</p>
          </div>
        </div>
        <Link href="/my/profile" className="text-[14px]">
          내 정보 관리
        </Link>
        <MateBox mateList={info.friends} />
      </div>
    </div>
  );
};

export default UserProfile;
