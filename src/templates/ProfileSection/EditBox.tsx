"use client";

import { useState } from "react";
import Image from "next/image";
import Trapezoid from "@/components/Trapezoid";

interface EditBoxPropsType {
  nickname: string;
  profileImageUrl: string;
}

const EditBox = ({ nickname, profileImageUrl }: EditBoxPropsType) => {
  const [isHoverProfile, setIsHoverProfile] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<string | null>(profileImageUrl);
  const [name, setName] = useState<string>(nickname);
  const disabledEditByNameLength = name.length < 2 || name.length > 10;

  return (
    <div className="flex flex-col items-center">
      <div>
        <Trapezoid
          isHover={isHoverProfile}
          styles={{
            width: "180px",
            height: "180px",
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
            bgColor: "white",
          }}
        >
          {profileImageUrl && (
            <Image
              src={profileImageUrl}
              alt="thumbnail"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          )}
          <input />
          <div
            onMouseOver={() => setIsHoverProfile(true)}
            onMouseLeave={() => setIsHoverProfile(false)}
            className="cursor-pointer w-full h-full flex justify-center items-center"
          >
            <p className="text-[20px] font-semibold">수정</p>
          </div>
        </Trapezoid>
      </div>
      <div className="mb-[30px]">
        <p className="text-[18px] mt-[20px]">이름</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block mx-auto bg-main_black w-[180px] h-[50px] 
        border-b-[1px] border-white placeholder:text-white text-[18px] 
        outline-none text-center"
        />
        <label
          className={`text-[12px] ${
            disabledEditByNameLength && "text-main_pink"
          }`}
        >
          2-10자로 설정해주세요.
        </label>
      </div>
      <Trapezoid
        styles={{
          width: "78px",
          height: "32px",
          clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0% 100%)",
          bgColor: "white",
        }}
      >
        <button disabled={disabledEditByNameLength} className="w-full h-full">
          <p className="text-main_black text-center pt-[5.5px]">수정</p>
        </button>
      </Trapezoid>
    </div>
  );
};

export default EditBox;
