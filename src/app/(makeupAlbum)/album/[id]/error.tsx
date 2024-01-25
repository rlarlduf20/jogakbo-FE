"use client";
import Link from "next/link";

const Error = () => {
  return (
    <section>
      <p>유효하지 않은 접근입니다.</p>
      <Link href="/">홈</Link>
    </section>
  );
};

export default Error;
