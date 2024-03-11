import { useState, useEffect } from "react";
import Image from "next/image";
import { Trapezoid } from "@/components/Trapezoid";
import SearchIcon from "../../../../public/images/svg/search.svg";
import { type FriendsType } from "@/types";

interface TypeMembersPropsType {
  albumID: string;
}

const TypeMembers = ({ albumID }: TypeMembersPropsType) => {
  const [mateList, setMateList] = useState<FriendsType[]>([]);
  const [albumOwnerInfo, setAlbumOwnerInfo] = useState<any>({});
  const [albumEditorsInfo, setAlbumEditorsInfo] = useState<any>([]);
  const [albumInviteesInfo, setAlbumInviteesInfo] = useState<any>([]);
  const [isAlbumOwner, setIsAlbumOwner] = useState<boolean>(true);

  useEffect(() => {
    const getMemberList = async () => {
      const res = await fetch("/api/albumInfo/members", {
        method: "POST",
        body: JSON.stringify({ albumID }),
      });
      const data = await res.json();

      setAlbumOwnerInfo(data.albumOwnerInfo);
      setAlbumEditorsInfo(data.albumEditorsInfos);
      setAlbumInviteesInfo(data.albumInviteesInfos);
    };

    getMemberList();
  }, [albumID]);

  useEffect(() => {
    const getMateList = async () => {
      const res = await fetch("/api/profile/friend");
      const data = await res.json();

      setMateList(() => {
        let impossibleInviteList: any = [];
        for (const i of data) {
          if (i.userUUID === albumOwnerInfo.userUUID) {
            impossibleInviteList.push(i);
            setIsAlbumOwner(false);
          }
          for (const j of albumInviteesInfo) {
            if (i.userUUID === j.userUUID) {
              impossibleInviteList.push(i);
            }
          }
          for (const j of albumEditorsInfo) {
            if (i.userUUID === j.userUUID) {
              impossibleInviteList.push(i);
            }
          }
        }
        let impossibleSocialIDs = new Set(
          impossibleInviteList.map((obj: any) => obj.userUUID)
        );
        let mateList = data.filter(
          (obj: any) => !impossibleSocialIDs.has(obj.userUUID)
        );
        return mateList;
      });
    };
    getMateList();
  }, [albumOwnerInfo, albumEditorsInfo, albumInviteesInfo]);

  const handleInvite = async (mateInfo: FriendsType) => {
    const res = await fetch("/api/albumInvite", {
      method: "POST",
      body: JSON.stringify({
        albumID,
        socialID: mateInfo.userUUID,
      }),
    });
    if (!res.ok) {
      alert("초대 권한이 없습니다.");
      return;
    }

    setMateList((prev) =>
      prev.filter((item) => item.userUUID !== mateInfo.userUUID)
    );
    setAlbumInviteesInfo((prev: FriendsType[]) => [...prev, mateInfo]);
    alert("초대 메시지가 발송됐습니다.");
  };

  return (
    <section className="flex pl-[10px] h-[330px] gap-[25px]">
      <div className="w-[510px]">
        <div className="flex mb-[28px]">
          <p className="text-[18px] grow">구성원 목록</p>
          <div className="relative">
            <Image
              src={SearchIcon}
              alt="검색"
              className="absolute top-[7px] left-[2px]"
              width={14}
              height={14}
            />
            <input
              placeholder="검색 기능 준비중!!"
              disabled
              className="w-[140px] pl-[20px] pb-[5px] bg-main_black 
            outline-none border-b-[1px] border-white box-border text-[12px]"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-x-[37px] gap-y-[20px] h-[250px] overflow-scroll">
          <div>
            <Trapezoid
              styles={{
                width: "70px",
                height: "70px",
                clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
                position: "relative",
                bgColor: "white",
              }}
            >
              {albumOwnerInfo.profileImageURL && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_URL}${albumOwnerInfo.userUUID}/${albumOwnerInfo.profileImageURL}`}
                  alt="thumbnail"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              )}
              <p className="text-main_black text-[10px] pt-[2px] pl-[4px]">
                주인장
              </p>
            </Trapezoid>
            <p className="text-[14px] pt-[10px]">{albumOwnerInfo.nickname}</p>
          </div>
          {albumEditorsInfo?.map((item: any, index: number) => (
            <div key={index}>
              <Trapezoid
                styles={{
                  width: "70px",
                  height: "70px",
                  clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
                  position: "relative",
                  bgColor: "white",
                }}
              >
                {item.profileImageURL && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL}${item.userUUID}/${item.profileImageURL}`}
                    alt="thumbnail"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                )}
              </Trapezoid>
              <p className="text-[14px] pt-[10px]">{item.nickname}</p>
            </div>
          ))}
          {albumInviteesInfo?.map((item: any, index: number) => (
            <div key={index} className="opacity-30">
              <Trapezoid
                styles={{
                  width: "70px",
                  height: "70px",
                  clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
                  position: "relative",
                  bgColor: "white",
                }}
              >
                {item.profileImageURL && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL}${item.userUUID}/${item.profileImageURL}`}
                    alt="thumbnail"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                )}
                <p className="text-main_black text-[10px] pt-[2px] pl-[4px]">
                  대기중
                </p>
              </Trapezoid>
              <p className="text-[14px] pt-[10px]">{item.nickname}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grow">
        <p className="text-[18px] mb-[28px]">구성원 초대</p>
        <div className="h-[250px] overflow-scroll">
          {!isAlbumOwner ? (
            <p className="text-[14px]">초대 권한이 없습니다.</p>
          ) : (
            mateList.map((item, index) => (
              <div key={index} className="flex items-center mb-[20px]">
                <Trapezoid
                  styles={{
                    width: "40px",
                    height: "40px",
                    clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
                    position: "relative",
                    bgColor: "white",
                  }}
                >
                  {item.profileImageURL && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_URL}${item.userUUID}/${item.profileImageURL}`}
                      alt="thumbnail"
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  )}
                </Trapezoid>
                <p className="ml-[10px] grow text-[14px]">{item.nickname}</p>
                <p
                  className="underline text-[14px] cursor-pointer"
                  onClick={() => handleInvite(item)}
                >
                  초대
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
export default TypeMembers;
