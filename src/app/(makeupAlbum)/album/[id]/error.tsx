"use client";
import Link from "next/link";
import Image from "next/image";
import ErrorLogo from "../../../../../public/images/error.png";

const Error = () => {
  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center gap-[35px]">
      <Image src={ErrorLogo} alt="에러" />
      <p className="text-[20px]">유효하지 않은 접근입니다.</p>
      <div className="flex gap-[10px]">
        <Link href="/my" className="underline text-[14px]">
          홈
        </Link>
        <p
          className="underline text-[14px] cursor-pointer"
          onClick={() => {
            window.location.reload();
          }}
        >
          새로고침
        </p>
      </div>
    </section>
  );
};

export default Error;
