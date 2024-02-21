"use client";

import useScrollY from "@/hooks/useScrollY";
import { useRef } from "react";

const IntroText = () => {
  const ref = useRef<any>();
  const { scrollY } = useScrollY(ref);

  return (
    <p
      ref={ref}
      className={`${
        scrollY >= 1117
          ? "relative text-center"
          : "fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
      }
         text-white text-[32px] font-semibold
          whitespace-nowrap`}
    >
      언제 어디서나 흩어진 사진들을 모아볼 수 있으면 어떨까?
    </p>
  );
};

export default IntroText;
