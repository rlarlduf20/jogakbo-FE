"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AlbumList from "./AlbumList";
import type { UserType } from "@/types";
import PlusIcon from "../../../public/images/svg/plus.svg";
import SortIcon from "../../../public/images/svg/sort-trapezoid.svg";
import OwnerSortIcon from "../../../public/images/svg/sort-rectangle.svg";
import OwnerSortActiveIcon from "../../../public/images/svg/sort-rectangle-active.svg";

interface UserAlbumsProps {
  user: UserType;
}
const UserAlbums = ({ user }: UserAlbumsProps) => {
  const [isOwnerJogakbo, setIsOwnerJogakbo] = useState<boolean>(false);

  let entireAlbumList = isOwnerJogakbo
    ? user.albums
    : user.albums.concat(user.collaboAlbums);
  entireAlbumList.sort((a, b) => {
    return (
      new Date(b.createdDate).valueOf() - new Date(a.createdDate).valueOf()
    );
  });
  const handleOwnerBtnClick = () => {
    setIsOwnerJogakbo((prev) => !prev);
  };
  return (
    <div className="w-full min-h-[800px] pb-[80px]">
      <div className="flex mb-[30px] gap-[52px]">
        <div className="flex gap-[5px]">
          <Image src={SortIcon} alt="정렬 아이콘" />
          <p>정렬</p>
        </div>
        <div className="grow">
          <div
            className="flex gap-[5px] w-[172px] cursor-pointer"
            onClick={handleOwnerBtnClick}
          >
            {isOwnerJogakbo ? (
              <Image src={OwnerSortActiveIcon} alt="정렬 아이콘" />
            ) : (
              <Image src={OwnerSortIcon} alt="정렬 아이콘" />
            )}
            <button>내가 만든 조각보만 보기</button>
          </div>
        </div>
        <Link
          href="/addAlbum"
          scroll={false}
          className="flex gap-[5px] items-center"
        >
          <Image src={PlusIcon} alt="추가 아이콘" />
          <p>새로운 조각보 만들기</p>
        </Link>
      </div>
      <div className="flex flex-wrap gap-y-[10px]">
        <AlbumList albums={entireAlbumList} />
      </div>
    </div>
  );
};

export default UserAlbums;
