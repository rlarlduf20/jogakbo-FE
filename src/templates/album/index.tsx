"use client";
import { useEffect, useRef, useState } from "react";
import { albumMockDataList } from "./assets/mockData";
import { Canvas } from "fabric";

const AlbumSection = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(albumMockDataList);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: 1200,
      height: 700,
    });

    return () => {
      console.log(canvas);
      canvas.dispose();
    };
  }, []);

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

      <canvas ref={canvasRef} className="bg-slate-200 w-[1200px] h-[700px]" />
    </section>
  );
};

export default AlbumSection;
