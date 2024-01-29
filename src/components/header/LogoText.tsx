"use client";

import { usePathname } from "next/navigation";

const LogoText = () => {
  const pathname = usePathname();

  return (
    <p className="flex-grow font-semibold text-[22px] ml-[10px]">
      {pathname === "/browse"
        ? "둘러보기"
        : pathname === "/my/profile"
        ? "내 정보"
        : "내 조각보"}
    </p>
  );
};

export default LogoText;
