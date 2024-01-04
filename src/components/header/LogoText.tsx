"use client";

import { usePathname } from "next/navigation";

const LogoText = () => {
  const pathname = usePathname();

  return (
    <p className="flex-grow font-semibold text-[22px] ml-[10px]">
      {pathname === "/" ? "내 조각보" : "둘러보기"}
    </p>
  );
};

export default LogoText;
