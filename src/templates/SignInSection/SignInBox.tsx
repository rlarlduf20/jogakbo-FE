"use client";

import Image from "next/image";
import KakaoLoginBtn from "../../../public/images/sign/kakao_login_btn.png";
import NaverLoginBtn from "../../../public/images/sign/naver_login_btn.png";
import { signIn } from "next-auth/react";

const SignInBox = () => {
  return (
    <div>
      <Image
        src={KakaoLoginBtn}
        alt="카카오 로그인"
        className="mb-[15px] cursor-pointer"
        width={330}
        onClick={() => signIn("kakao")}
      />

      <Image
        src={NaverLoginBtn}
        alt="네이버 로그인"
        className="cursor-pointer"
        width={330}
        onClick={() => signIn("naver")}
      />
    </div>
  );
};

export default SignInBox;
