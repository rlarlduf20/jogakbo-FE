"use client";

import { useRef } from "react";
import Image from "next/image";
import useScrollY from "@/hooks/useScrollY";
import DoubleQuoteStart from "../../../public/images/svg/double-quote-start.svg";
import DoubleQuoteEnd from "../../../public/images/svg/double-quote-end.svg";

const INTRO_SECTION_HEIGHT = 1117;

const IntroText = () => {
  const ref = useRef<any>(null);
  const { scrollYPos } = useScrollY();

  return (
    <div
      ref={ref}
      className={`${
        scrollYPos + ref?.current?.getBoundingClientRect()?.top >=
        INTRO_SECTION_HEIGHT
          ? "absolute left-[50%] translate-x-[-50%]"
          : "fixed top-[340px] left-[50%] translate-x-[-50%]"
      } w-[782px] height-[77px] flex`}
    >
      <Image
        src={DoubleQuoteStart}
        alt="따옴표"
        className="absolute top-0 left-0"
      />
      <p className="absolute left-[50%] translate-x-[-50%] text-white text-[32px] font-semibold whitespace-nowrap ">
        언제 어디서나 흩어진 사진들을 모아볼 수 있으면 어떨까?
      </p>
      <Image
        src={DoubleQuoteEnd}
        alt="따옴표"
        className="absolute top-0 right-0"
      />
    </div>
  );
};

export default IntroText;
