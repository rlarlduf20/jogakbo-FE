"use client";

import useScrollY from "@/hooks/useScrollY";
import { useRef } from "react";

const IntroText = () => {
  const ref = useRef<any>(null);
  const { scrollYPos } = useScrollY();

  return (
    <p
      ref={ref}
      className={`${
        scrollYPos + ref?.current?.getBoundingClientRect()?.top >= 1117
          ? "absolute left-[50%] translate-x-[-50%]"
          : "fixed top-[340px] left-[50%] translate-x-[-50%]"
      }
         text-white text-[32px] font-semibold
          whitespace-nowrap`}
    >
      언제 어디서나 흩어진 사진들을 모아볼 수 있으면 어떨까?
    </p>
  );
};

export default IntroText;
