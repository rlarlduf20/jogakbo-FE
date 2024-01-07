"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Trapezoid from "@/components/Trapezoid";
import type { AlbumsType } from "@/types";

interface AlbumListProps {
  albums: AlbumsType[];
}

const SHAPE_BY_INDEX = [
  [
    "[clipPath:polygon(0%_0%,75%_0%,100%_100%,0%_100%)]",
    "[clipPath:polygon(0%_0%,100%_0%,100%_100%,25%_100%)]",
  ],
  [
    "[clipPath:polygon(0%_0%,100%_0%,75%_100%,0%_100%)]",
    "[clipPath:polygon(25%_0%,100%_0%,100%_100%,0%_100%)]",
  ],
];
const mockThumbnailList = [
  "/images/desert.jpeg",
  "/images/gameover.png",
  "/images/lion.png",
  "/images/ocean.jpeg",
  "/images/park.jpeg",
  "/images/rabbit.png",
  "/images/smileBall.png",
];
const EachAlbumInfo = ({
  random,
  column,
  albumName,
}: {
  random: number;
  column: number;
  albumName: string;
}) => {
  return (
    <>
      <Image
        src={mockThumbnailList[random]}
        alt="thumbnail"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <p
        className={`rotate-90 font-semibold w-[200px] text-[20px] origin-top-left absolute top-[24px] ${
          column === 0 ? "left-[35px]" : "left-[75px]"
        }`}
      >
        {albumName}
      </p>
    </>
  );
};

const AlbumList = ({ albums }: AlbumListProps) => {
  const [hoverIndex, setHoverIndex] = useState<any>(null);
  console.log(Math.floor(hoverIndex / 10) * 10 + 9);
  return (
    <>
      {albums.map((item, index) => {
        const column = index % 2;
        const row = Math.floor(index / 10) % 2;

        return (
          <div
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            className={`${
              index === hoverIndex
                ? column === 0
                  ? "mr-[10px]"
                  : "ml-[20px] mr-[10px]"
                : column === 0
                ? "mr-[-10px]"
                : "mr-[10px]"
            } ${
              hoverIndex !== null
                ? index === Math.floor(hoverIndex / 10) * 10 + 9
                  ? "mr-0"
                  : (index + 1) % 10 === 0 && "mr-[83px]"
                : (index + 1) % 10 === 0 && "mr-[83px]"
            } ${index === hoverIndex ? "w-[150px]" : "w-[80px]"} relative ${
              index === hoverIndex || SHAPE_BY_INDEX[row][column]
            } h-[200px] $`}
          >
            <Link href={`/album/${item.albumID}`}>
              <EachAlbumInfo
                random={index % 7}
                column={column}
                albumName={item.albumName}
              />
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default AlbumList;
