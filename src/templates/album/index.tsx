"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { albumInfo, albumMockDataList } from "./assets/mockData";

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
    const renderCanvas = (canvasRef: any, currentPage: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log(currentPage);
      const currentPageData = albumMockDataList.find(
        (data) => data.page === currentPage
      );

      if (currentPageData) {
        currentPageData.imgList.forEach(({ src, locationX, locationY }) => {
          if (src) {
            const image = new Image();
            image.src = src;
            image.onload = () => {
              ctx.drawImage(image, locationX, locationY);
            };
          }
        });
      }
    };

    renderCanvas(canvasLeftRef, page);
    renderCanvas(canvasRightRef, page + 1);
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
          className={`${page !== 1 && "hover:cursor-pointer"}`}
          disabled={page === 1}
          onClick={onClickPrev}
        >
          이전
        </button>
        <input className="border-2 block m-auto" />
        {page === albumMockDataList.length - 1 ? (
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
