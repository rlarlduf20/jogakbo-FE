import { useState, useEffect } from "react";
import Image from "next/image";
import { Trapezoid } from "@/components/Trapezoid";
import SearchIcon from "../../../../public/images/svg/search.svg";
import { FriendsType } from "@/types";

interface TypeMembersPropsType {
  albumID: string;
}

const TypeMembers = ({ albumID }: TypeMembersPropsType) => {
  const [mateList, setMateList] = useState<FriendsType[]>([]);
  const [albumOwner, setAlbumOwner] = useState<any>({});
  const [albumEditors, setAlbumEditors] = useState<any>([]);
  const [sentAlbumInvitations, setSentAlbumInvitations] = useState<any>([]);
  const [inviteBtnClickCheck, setInviteBtnClickCheck] =
    useState<boolean>(false);
  const [isAlbumOwner, setIsAlbumOwner] = useState<boolean>(true);

  useEffect(() => {
    const getMemberList = async () => {
      const res = await fetch("/api/albumInfo", {
        method: "POST",
        body: JSON.stringify({ albumID }),
      });
      const data = await res.json();
      setAlbumOwner(data.albumOwnerInfo);
      setAlbumEditors(data.albumEditorsInfo);
      setSentAlbumInvitations(data.sentAlbumInvitationsInfo);
    };

    getMemberList();
  }, [albumID, inviteBtnClickCheck]);

  useEffect(() => {
    const getMateList = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();

      setMateList(() => {
        let impossibleInviteList: any = [];
        for (const i of data.friends) {
          if (i.socialID === albumOwner.socialID) {
            impossibleInviteList.push(i);
            setIsAlbumOwner(false);
          }
          for (const j of sentAlbumInvitations) {
            if (i.socialID === j.socialID) {
              impossibleInviteList.push(i);
            }
          }
          for (const j of albumEditors) {
            if (i.socialID === j.socialID) {
              impossibleInviteList.push(i);
            }
          }
        }
        let impossibleSocialIDs = new Set(
          impossibleInviteList.map((obj: any) => obj.socialID)
        );
        let mateList = data.friends.filter(
          (obj: any) => !impossibleSocialIDs.has(obj.socialID)
        );
        return mateList;
      });
    };
    getMateList();
  }, [sentAlbumInvitations, albumEditors, albumOwner, inviteBtnClickCheck]);

  const handleInvite = async (socialID: string) => {
    const res = await fetch("/api/albumInvite", {
      method: "POST",
      body: JSON.stringify({
        albumID,
        socialID,
      }),
    });
    if (!res.ok) {
      alert("요청에 실패했습니다. 다시 시도해주세요.");
      return;
    }
    setInviteBtnClickCheck((prev) => !prev);

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
              {albumOwner.profileImageURL && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_URL}${albumOwner.socialID}/${albumOwner.profileImageURL}`}
                  alt="thumbnail"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              )}
              <p className="text-main_black text-[10px] pt-[2px] pl-[4px]">
                주인장
              </p>
            </Trapezoid>
            <p className="text-[14px] pt-[10px]">{albumOwner.nickname}</p>
          </div>
          {albumEditors?.map((item: any, index: number) => (
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
                    src={`${process.env.NEXT_PUBLIC_S3_URL}${item.socialID}/${item.profileImageURL}`}
                    alt="thumbnail"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                )}
              </Trapezoid>
              <p className="text-[14px] pt-[10px]">{item.nickname}</p>
            </div>
          ))}
          {sentAlbumInvitations?.map((item: any, index: number) => (
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
                    src={`${process.env.NEXT_PUBLIC_S3_URL}${item.socialID}/${item.profileImageURL}`}
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
                      src={`${process.env.NEXT_PUBLIC_S3_URL}${item.socialID}/${item.profileImageURL}`}
                      alt="thumbnail"
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  )}
                </Trapezoid>
                <p className="ml-[10px] grow text-[14px]">{item.nickname}</p>
                <p
                  className="underline text-[14px] cursor-pointer"
                  onClick={() => handleInvite(item.socialID)}
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
