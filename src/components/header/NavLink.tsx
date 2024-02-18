"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MyJogakboIcon from "../../../public/images/svg/my-jogakbo.svg";
import BrowseIcon from "../../../public/images/svg/browse.svg";

const NavLink = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/browse" ? (
        <>
          <Link href="/">
            <Image src={MyJogakboIcon} alt="내 조각보 아이콘" />
          </Link>
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
