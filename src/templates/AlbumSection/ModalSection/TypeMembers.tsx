import { useState, useEffect } from "react";
import Image from "next/image";
import { Trapezoid } from "@/components/Trapezoid";
import SearchIcon from "../../../../public/images/svg/search.svg";
import { mockMembersList } from "@/assets/mockData";
import { FriendsType } from "@/types";

interface TypeMembersPropsType {
  albumID: string;
}

const TypeMembers = ({ albumID }: TypeMembersPropsType) => {
  const [mateList, setMateList] = useState<FriendsType[]>([]);
  useEffect(() => {
    const getMateList = async () => {
      const res = await fetch("/api/profile");
      const { friends } = await res.json();
      setMateList(friends);
    };
    getMateList();
  }, []);

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
              placeholder="구성원 검색"
              className="w-[140px] pl-[20px] pb-[5px] bg-main_black 
            outline-none border-b-[1px] border-white box-border text-[12px]"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-x-[37px] gap-y-[20px] h-[250px] overflow-scroll">
          {mockMembersList.map((item, index) => (
            <div key={index} className={`${item.isStandBy && "opacity-30"}`}>
              <Trapezoid
                styles={{
                  width: "70px",
                  height: "70px",
                  clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
                  position: "relative",
                  bgColor: "white",
                }}
              >
                {item.owner && (
                  <p className="text-main_black text-[10px] pt-[2px] pl-[4px]">
                    주인장
                  </p>
                )}
                {item.isStandBy && (
                  <p className="text-main_black text-[10px] pt-[2px] pl-[4px]">
                    초대됨
                  </p>
                )}
              </Trapezoid>
              <p className="text-[14px] pt-[10px]">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grow">
        <p className="text-[18px] mb-[28px]">구성원 초대</p>
        <div className="h-[250px] overflow-scroll">
          {mateList.map((item, index) => (
            <div key={index} className="flex items-center mb-[20px]">
              <Trapezoid
                styles={{
                  width: "40px",
                  height: "40px",
                  clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
                  position: "relative",
                  bgColor: "white",
                }}
              />
              <p className="ml-[10px] grow text-[14px]">{item.nickname}</p>
              <p
                className="underline text-[14px] cursor-pointer"
                onClick={() => handleInvite(item.socialID)}
              >
                초대
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TypeMembers;
