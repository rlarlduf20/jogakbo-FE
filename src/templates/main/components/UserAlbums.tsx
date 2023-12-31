import Trapezoid from "@/components/shape/Trapezoid";
import { albumInfo } from "@/templates/album/assets/mockData";
import Image from "next/image";
import Link from "next/link";

const shpapeByIndex = [
  [
    "polygon(0 0, 75% 0, 100% 100%, 0% 100%)",
    "polygon(0 0, 100% 0, 100% 100%, 25% 100%)",
  ],
  [
    "polygon(0 0, 100% 0, 75% 100%, 0 100%)",
    "polygon(25% 0, 100% 0, 100% 100%, 0 100%)",
  ],
];

const Albums = () => {
  return (
    <>
      {albumInfo.map((item, index) => {
        const column = index % 2;
        const row = Math.floor(index / 10) % 2;
        return (
          <div
            key={index}
            className={`${column === 0 ? "mr-[-10px]" : "mr-[10px]"} relative`}
          >
            <Trapezoid
              styles={{
                width: "80px",
                height: "200px",
                clipPath: shpapeByIndex[row][column],
                bgImg: item.src,
              }}
            >
              {item.src && (
                <Image
                  src={item.src}
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              )}
              <p
                className={`rotate-90 font-semibold w-[200px] text-[20px] origin-top-left absolute top-[24px] ${
                  column === 0 ? "left-[35px]" : "left-[75px]"
                }`}
              >
                {item.title}
              </p>
            </Trapezoid>
          </div>
        );
      })}
    </>
  );
};

const UserAlbums = () => {
  return (
    <div className="w-full">
      <div className="mb-[30px]">
        <Link href="/album" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M5.5 0V16H11.5L9.7 0H5.5Z" fill="white" />
            <path
              d="M16 5.5L0 5.5L-2.62268e-07 11.5L16 9.7L16 5.5Z"
              fill="white"
            />
          </svg>
          <p className="ml-[5px]">새로운 조각보 만들기</p>
        </Link>
      </div>
      <div className="flex flex-wrap w-[800px] gap-y-[10px]">
        <Albums />
      </div>
    </div>
  );
};

export default UserAlbums;
