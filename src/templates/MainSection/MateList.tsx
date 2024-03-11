"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trapezoid } from "@/components/Trapezoid";
import useMouseDownOutside from "@/hooks/useMouseDownOutside";
import { FriendsType } from "@/types";

interface MateBoxPropsType {
  mateList: FriendsType[];
}

const MateList = ({ mateList }: MateBoxPropsType) => {
  const router = useRouter();
  const [openIdx, setOpenIdx] = useState<number>(-1);
  const editBoxRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useMouseDownOutside(editBoxRef);

  const handleRightClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setIsOpen(true);
    setOpenIdx(index);
  };
  const handleDeleteMate = async (name: string, userID: string) => {
    const res = await fetch("/api/friend", {
      method: "DELETE",
      body: JSON.stringify({
        userID,
      }),
    });
    if (res.ok) {
      alert(`이제 ${name}님과 친구가 아닙니다.`);
      router.refresh();
      setIsOpen(false);
      return;
    }
    alert("다시 시도해주세요.");
  };
  return (
    <div className="h-[250px] overflow-scroll">
      {mateList?.map((item, index) => (
        <div
          key={index}
          className="relative flex items-center mb-[24px] cursor:context-menu"
          onContextMenu={(e) => handleRightClick(e, index)}
        >
          {isOpen && openIdx === index && (
            <div
              ref={editBoxRef}
              className="absolute z-30 top-[35px] left-[50px] w-[80px] h-[56px] bg-main_black border-white border-[1px] px-[12px] py-[5px]"
            >
              <p
                className="text-[14px] mb-[4px] cursor-pointer"
                onClick={() => handleDeleteMate(item.nickname, item.userUUID)}
              >
                친구 삭제
              </p>
              <p className="text-[14px] cursor-no-drop">알림 끄기</p>
            </div>
          )}
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
        </div>
      ))}
    </div>
  );
};

export default MateList;
