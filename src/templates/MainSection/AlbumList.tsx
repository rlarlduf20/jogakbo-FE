import Link from "next/link";
import Image from "next/image";
import Trapezoid from "@/components/Trapezoid";
import type { AlbumsType } from "@/types";

interface AlbumListProps {
  albums: AlbumsType[];
}

const shapeByIndex = [
  [
    "polygon(0 0, 75% 0, 100% 100%, 0% 100%)",
    "polygon(0 0, 100% 0, 100% 100%, 25% 100%)",
  ],
  [
    "polygon(0 0, 100% 0, 75% 100%, 0 100%)",
    "polygon(25% 0, 100% 0, 100% 100%, 0 100%)",
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
const AlbumList = ({ albums }: AlbumListProps) => {
  return (
    <>
      {albums.map((item, index) => {
        const column = index % 2;
        const row = Math.floor(index / 10) % 2;
        const random = Math.floor(Math.random() * 7);
        return (
          <div
            key={index}
            className={`${column === 0 ? "mr-[-10px]" : "mr-[10px]"} relative`}
          >
            <Link href={`/album/${item.albumID}`}>
              <Trapezoid
                styles={{
                  width: "80px",
                  height: "200px",
                  clipPath: shapeByIndex[row][column],
                }}
              >
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
                  {item.albumName}
                </p>
              </Trapezoid>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default AlbumList;
