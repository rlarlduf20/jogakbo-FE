"use client";

import { useState } from "react";
import Image from "next/image";
import NotAgainIcon from "../../public/images/svg/sort-rectangle.svg";
import NotAgainActiveIcon from "../../public/images/svg/sort-rectangle-active.svg";
import { TrapeButton } from "./Trapezoid";

interface IntroModalProps {
  role: string;
}

const IntroModal = ({ role }: IntroModalProps) => {
  const [isBeginner, setIsBeginner] = useState(role === "BEGINNER");
  const [isCheckedNotAgainBtn, setIsCheckedNotAgainBtn] = useState(false);

  if (!isBeginner) {
    return null;
  }
  const handleNotAgainBtnClick = async () => {
    if (isCheckedNotAgainBtn) {
      const res = await fetch("/api/needLessIntro");
      if (!res.ok) {
        alert("다시 보지 않기가 반영되지 않았습니다.");
      }
    }
    setIsBeginner(false);
  };

  return (
    <section
      className="absolute z-40 top-[-80px] left-0 w-[1200px] h-[800px]
        bg-guide bg-center bg-cover bg-no-repeat"
    >
      <div className="absolute bottom-[50px] right-[65px] flex gap-[30px] items-center">
        <button
          className="flex gap-[5px] items-center"
          onClick={() => {
            setIsCheckedNotAgainBtn((prev) => !prev);
          }}
        >
          {isCheckedNotAgainBtn ? (
            <Image src={NotAgainActiveIcon} alt="다시보지않기" />
          ) : (
            <Image src={NotAgainIcon} alt="다시보지않기" />
          )}
          <p>다시 보지 않기</p>
        </button>
        <TrapeButton type="outline" handleClick={handleNotAgainBtnClick}>
          확인
        </TrapeButton>
      </div>
    </section>
  );
};

export default IntroModal;
