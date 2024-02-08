"use client";

import { useState } from "react";
import Image from "next/image";
import KakaoLoginBtn from "../../../public/images/sign/kakao_login_btn.png";
import NaverLoginBtn from "../../../public/images/sign/naver_login_btn.png";
import { signIn } from "next-auth/react";
import LoadingGIF from "@/components/LoadingGIF";

const SignInBox = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading && <LoadingGIF />}
      <Image
        src={KakaoLoginBtn}
        alt="카카오 로그인"
        className="mb-[15px] cursor-pointer"
        width={300}
        onClick={async () => {
          signIn("kakao");
          setIsLoading((prev) => !prev);
        }}
      />

      <Image
        src={NaverLoginBtn}
        alt="네이버 로그인"
        className="cursor-pointer"
        width={300}
        onClick={async () => {
          signIn("naver");
          setIsLoading((prev) => !prev);
        }}
      />
    </div>
  );
};

export default SignInBox;
