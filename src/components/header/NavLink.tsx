"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" ? (
        <Link href="/browse">둘러보기</Link>
      ) : (
        <Link href="/">내 조각보</Link>
      )}
    </>
  );
};

export default NavLink;
