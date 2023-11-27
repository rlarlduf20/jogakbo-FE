"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { albumInfo, albumMockDataList } from "./assets/mockData";
import { renderCanvas } from "./lib/utils";

const AlbumSection = () => {
  const canvasLeftRef = useRef<any>();
  const canvasRightRef = useRef<any>();
  const [page, setPage] = useState(1);
  const [isDrag, setIsDrag] = useState(false);

  const handleDrop = useCallback((event: any) => {
    event.preventDefault();
    setIsDrag(false);
    const files = event.dataTransfer.files;
    console.log(files);
  }, []);
  const handleDragOver = useCallback((event: any) => {
    event.preventDefault();
    setIsDrag(true);
  }, []);

  useEffect(() => {
    renderCanvas(albumMockDataList, canvasLeftRef, page);
    renderCanvas(albumMockDataList, canvasRightRef, page + 1);
  }, [page]);

  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };

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

      <div className="flex gap-[40px]">
        <canvas
          ref={canvasLeftRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => {
            setIsDrag(false);
          }}
          className={`${isDrag ? "border-4" : "border-2"} w-[580px] h-[600px]`}
        ></canvas>
        <canvas
          ref={canvasRightRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => {
            setIsDrag(false);
          }}
          className={`${isDrag ? "border-4" : "border-2"} w-[580px] h-[600px]`}
        ></canvas>
      </div>
    </section>
  );
};

export default AlbumSection;
