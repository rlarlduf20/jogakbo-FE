import Link from "next/link";
import Image from "next/image";
import { Trapezoid } from "@/components/Trapezoid";
import type { AlbumsType } from "@/types";

interface AlbumListProps {
  albums: AlbumsType[];
}

const SHAPE_BY_INDEX = [
  [
    "polygon(0% 0%, 75% 0%, 100% 100%, 0% 100%)",
    "polygon(0% 0%,100% 0%, 100% 100%, 25% 100%)",
  ],
  [
    "polygon(0% 0%, 100% 0%, 75% 100%, 0% 100%)",
    "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)",
  ],
];
const THUMBNAIL_COLOR = ["#ff9898", "#59b86e", "#ffe381", "#7aacf7"];

const EachAlbumInfo = ({
  column,
  albumInfo,
}: {
  column: number;
  albumInfo: AlbumsType;
}) => {
  const { thumbnailImageURL, albumName, albumUUID } = albumInfo;
  return (
    <>
      {thumbnailImageURL && (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}${albumUUID}/${thumbnailImageURL}`}
          alt="thumbnail"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      )}

      <p
        className={`rotate-90 font-semibold w-[200px] text-[20px] origin-top-left absolute top-[24px] ${
          column === 0 ? "left-[35px]" : "left-[75px]"
        } z-30 relative`}
      >
        {albumName}
      </p>
    </>
  );
};

const AlbumList = ({ albums }: AlbumListProps) => {
  return (
    <>
      {albums.map((item, index) => {
        const column = index % 2;
        const row = Math.floor(index / 10) % 2;
        return (
          <div
            key={index}
            className={`${column === 0 ? "mr-[-10px]" : "mr-[10px]"} relative`}
          >
            <Link href={`/albumDetail/${item.albumUUID}`}>
              <Trapezoid
                styles={{
                  width: "80px",
                  height: "200px",
                  clipPath: SHAPE_BY_INDEX[row][column],
                  position: "relative",
                  bgColor: item.thumbnailImageURL
                    ? "white"
                    : THUMBNAIL_COLOR[index % 4],
                }}
              >
                <Trapezoid
                  styles={{
                    width: "80px",
                    height: "200px",
                    clipPath: SHAPE_BY_INDEX[row][column],
                    bgColor: "rgba(21,21,21,0.3)",
                    position: "absolute",
                    zIndex: 10,
                  }}
                />
                <EachAlbumInfo column={column} albumInfo={item} />
              </Trapezoid>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default AlbumList;
