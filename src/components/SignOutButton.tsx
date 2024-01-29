"use client";

import { signOut } from "next-auth/react";
import { signOutBE } from "@/lib/auth/sign";

const SignOutButton = () => {
  const onClickSignOut = async () => {
    const res = await signOutBE();
    // if (!res.ok) {
    //   alert("로그아웃에 실패했습니다! 잠시 후 다시 시도해주세요.");
    //   console.error(res);
    // }
    signOut();
  };

  return (
    <>
      <button onClick={onClickSignOut} className="text-[14px] underline">
        로그아웃
      </button>
    </>
  );
};

export default SignOutButton;
