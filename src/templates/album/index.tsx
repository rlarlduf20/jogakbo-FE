"use client";

import { useEffect, useRef, useState } from "react";
import { albumInfo, albumMockDataList } from "./assets/mockData";
import { renderCanvas } from "./lib/utils";

const AlbumSection = () => {
  const albumRef = useRef<any>();

  const [page, setPage] = useState(1);
  const [isDrag, setIsDrag] = useState(false);

  const handleDrop = (event: any) => {
    event.preventDefault();
    setIsDrag(false);
    const files = event.dataTransfer.files;
    console.log(files);
  };
  const handleDragOver = (event: any) => {
    event.preventDefault();
    setIsDrag(true);
  };
  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    renderCanvas(albumMockDataList, albumRef, page);
  }, [page]);

  return (
    <section>
      <div className="w-[1200px] flex">
        <button
          className={`${page !== 1 && "hover:cursor-pointer"} ${
            page === 1 && "text-slate-300"
          }`}
          disabled={page === 1}
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

      <canvas
        ref={albumRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => {
          setIsDrag(false);
        }}
        className={`${isDrag ? "border-4" : "border-2"} w-[1200px] h-[600px]`}
      ></canvas>
    </section>
  );
};

export default AlbumSection;
