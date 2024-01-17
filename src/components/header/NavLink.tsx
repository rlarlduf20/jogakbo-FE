"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/browse" ? (
        <Link href="/">내 조각보</Link>
      ) : (
        <Link href="/browse">둘러보기</Link>
      )}
    </>
  );
};

export default NavLink;
