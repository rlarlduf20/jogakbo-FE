"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import AlbumList from "./AlbumList";
import type { UserType } from "@/types";
import PlusIcon from "../../../public/images/svg/plus.svg";
import SortIcon from "../../../public/images/svg/sort-trapezoid.svg";
import OwnerSortIcon from "../../../public/images/svg/sort-rectangle.svg";
import OwnerSortActiveIcon from "../../../public/images/svg/sort-rectangle-active.svg";
import useMouseDownOutside from "@/hooks/useMouseDownOutside";

interface UserAlbumsProps {
  user: UserType;
}
const UserAlbums = ({ user }: UserAlbumsProps) => {
  const [isOwnerJogakbo, setIsOwnerJogakbo] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>("created");
  const sortBoxRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useMouseDownOutside(sortBoxRef);
  let entireAlbumList = isOwnerJogakbo
    ? user.albums
    : user.albums.concat(user.collaboAlbums);
  sortType === "created"
    ? entireAlbumList.sort((a, b) => {
        return (
          new Date(b.createdDate).valueOf() - new Date(a.createdDate).valueOf()
        );
      })
    : sortType === "naming"
    ? entireAlbumList.sort((a, b) => {
        return a.albumName < b.albumName
          ? -1
          : a.albumName > b.albumName
          ? 1
          : 0;
      })
    : entireAlbumList.sort((a, b) => {
        return (
          new Date(b.lastModifiedDate).valueOf() -
          new Date(a.lastModifiedDate).valueOf()
        );
      });

  const handleOwnerBtnClick = () => {
    setIsOwnerJogakbo((prev) => !prev);
  };
  const handleClick = (value: string) => {
    setSortType(value);
  };

  return (
    <div className="w-full min-h-[800px] pb-[80px]">
      <div className="flex mb-[30px] gap-[52px]">
        <div className="relative" ref={sortBoxRef}>
          <div
            className="flex gap-[5px] cursor-pointer"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <Image
              src={SortIcon}
              alt="정렬 아이콘"
              className={`${
                isOpen && "rotate-180 transition-all duration-300"
              } transition-all duration-300`}
            />
            <button>정렬</button>
          </div>
          {isOpen && (
            <div
              className="absolute top-[25px] w-[90px] h-[78px] 
              border-[1px] border-white z-30 bg-main_black
              py-[5px] pl-[12px] flex flex-col gap-[1px]"
            >
              <p
                className={`${
                  sortType === "created" && "underline"
                } text-[14px] cursor-pointer`}
                onClick={() => handleClick("created")}
              >
                시간순
              </p>
              <p
                className={`${
                  sortType === "naming" && "underline"
                } text-[14px] cursor-pointer`}
                onClick={() => handleClick("naming")}
              >
                가나다 순
              </p>
              <p
                className={`${
                  sortType === "updated" && "underline"
                } text-[14px] cursor-pointer`}
                onClick={() => handleClick("updated")}
              >
                업데이트 순
              </p>
            </div>
          )}
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
