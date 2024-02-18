"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MyJogakboIcon from "../../../public/images/svg/my-jogakbo.svg";
import BrowseIcon from "../../../public/images/svg/browse.svg";
import useHoverText from "@/hooks/useHoverText";
import HoverText from "../HoverText";

const NavLink = () => {
  const pathname = usePathname();
  const { isHoverIcon, handleIsHoverToTrue, handleIsHoverToFalse } =
    useHoverText();

  return (
    <>
      {pathname === "/browse" ? (
        <div className="relative whitespace-nowrap">
          <Link
            href="/"
            onMouseOver={handleIsHoverToTrue}
            onMouseLeave={handleIsHoverToFalse}
          >
            <Image src={MyJogakboIcon} alt="내 조각보 아이콘" />
          </Link>
          {isHoverIcon && <HoverText>내 조각보</HoverText>}
        </div>
      ) : (
        pathname !== "/my/profile" && (
          <div className="relative whitespace-nowrap">
            <Link
              href="/browse"
              onMouseOver={handleIsHoverToTrue}
              onMouseLeave={handleIsHoverToFalse}
            >
              <Image src={BrowseIcon} alt="둘러보기 아이콘" />
            </Link>
            {isHoverIcon && <HoverText>둘러보기</HoverText>}
          </div>
        )
      )}
    </>
  );
};

export default NavLink;
