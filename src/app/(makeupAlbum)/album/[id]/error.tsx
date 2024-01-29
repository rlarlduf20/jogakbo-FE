"use client";
import Link from "next/link";
import Image from "next/image";
import ErrorLogo from "../../../../../public/images/error.png";

const Error = () => {
  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center gap-[35px]">
      <Image src={ErrorLogo} alt="에러" />
      <p className="text-[20px]">유효하지 않은 접근입니다.</p>
      <Link href="/my" className="underline text-[20px]">
        홈
      </Link>
    </section>
  );
};

export default Error;
