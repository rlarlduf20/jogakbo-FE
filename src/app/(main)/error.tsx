"use client";

import Image from "next/image";
import ErrorLogo from "../../../public/images/error.png";
import SignOutButton from "@/components/SignOutButton";

const Error = () => {
  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center mt-[-80px] gap-[35px]">
      <Image src={ErrorLogo} alt="에러" />
      <p className="text-[20px]">
        에러가 발생했습니다. 로그아웃 후 다시 시도해주세요.
      </p>
      <SignOutButton />
    </section>
  );
};

export default Error;
