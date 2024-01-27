"use client";

import { useState } from "react";
import Trapezoid from "@/components/Trapezoid";

const EditBox = () => {
  const [isHoverProfile, setIsHoverProfile] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center">
      <Trapezoid
        styles={{
          width: "180px",
          height: "180px",
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
          bgColor: "white",
        }}
      />
      <div className="mb-[50px]">
        <p className="text-[18px] mt-[20px]">이름</p>
        <input
          className="block mx-auto bg-main_black w-[180px] h-[50px] 
      border-b-[1px] border-white placeholder:text-white text-[18px] 
      outline-none text-center"
        />
        <label className="text-[12px]">2-10자로 설정해주세요.</label>
      </div>
      <Trapezoid
        styles={{
          width: "78px",
          height: "32px",
          clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0% 100%)",
          bgColor: "white",
        }}
      >
        <p className="text-main_black text-center pt-[5.5px]">수정</p>
      </Trapezoid>
    </div>
  );
};

export default EditBox;
