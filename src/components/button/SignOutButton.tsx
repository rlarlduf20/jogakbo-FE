"use client";

import { signOut } from "next-auth/react";
import { signOutBE } from "@/lib/auth/sign";

const SignOutButton = () => {
  const onClickSignOut = async () => {
    const res = await signOutBE();
    if (res.ok) {
      signOut();
    }
  };

  return (
    <>
      <button onClick={onClickSignOut}>로그아웃</button>
    </>
  );
};

export default SignOutButton;
