"use client";
import Image from "next/image";
import { useState } from "react";
import { albumMockDataList } from "./assets/mockData";

const AlbumSection = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(albumMockDataList);
  const { imgList }: any = images.find((data: any) => data.page === page);
  console.log(imgList);
  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };

  const locationStyle: any = (index: any) => {
    return {
      position: "absolute",
      left: imgList[index].location.xPos,
      top: imgList[index].location.yPos,
    };
  };

  return (
    <section>
      <div className="w-[1200px] flex">
        <button
          className={`${page > 1 && "hover:cursor-pointer"} ${
            page <= 1 && "text-slate-300"
          }`}
          disabled={page <= 1}
          onClick={onClickPrev}
        >
          이전
        </button>
        <input className="border-2 block m-auto" />
        {page >= albumMockDataList.length - 1 ? (
          <button className="hover:cursor-pointer" onClick={onClickNext}>
            생성
          </button>
        ) : (
          <button className="hover:cursor-pointer" onClick={onClickNext}>
            다음
          </button>
        )}
      </div>
      <div className="relative border-4 w-[1200px] h-[700px]">
        {imgList.map((item: any, index: any) => (
          <Image
            src={item.src}
            alt="img"
            width={item.size.width}
            height={item.size.height}
            style={locationStyle(index)}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default AlbumSection;
