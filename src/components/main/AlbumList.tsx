import Trapezoid from "@/components/Trapezoid";
import { albumInfo } from "@/assets/mockData";
import Image from "next/image";

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

const AlbumList = () => {
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
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
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

export default AlbumList;
