"use client";
import { signIn } from "next-auth/react";

const SignButton = () => {
  return (
    <>
      <button onClick={() => signIn()} className="pl-10 pr-10">
        로그인/가입
      </button>
    </>
  );
};

export default SignButton;
