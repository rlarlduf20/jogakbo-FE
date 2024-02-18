"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RouteTrapezoidIcon from "../../../public/images/svg/route-trapezoid.svg";
import BrowseIcon from "../../../public/images/svg/browse.svg";

const NavLink = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/browse" ? (
        <>
          <Image src={RouteTrapezoidIcon} alt="사다리꼴 아이콘" />
          <Link href="/">내 조각보</Link>
        </>
      ) : (
        pathname !== "/my/profile" && (
          <>
            <Link href="/browse">
              <Image src={BrowseIcon} alt="둘러보기 아이콘" />
            </Link>
          </>
        )
      )}
    </>
  );
};

export default NavLink;
