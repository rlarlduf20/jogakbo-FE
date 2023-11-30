"use client";
import { useEffect, useRef, useState } from "react";
import { albumMockDataList } from "./assets/mockData";
import { Layer, Stage, Image } from "react-konva";
import useImage from "use-image";

const AlbumImageByPage = ({ imageInfo }: { imageInfo: any }) => {
  const [image] = useImage(imageInfo.src);

  return (
    <Image
      image={image}
      x={imageInfo.location.xPos}
      y={imageInfo.location.yPos}
      alt="img"
      onDragEnd={(e) => console.log(e)}
      draggable
    />
  );
};

const AlbumSection = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(albumMockDataList);
  const imageList = images.find((data: any) => data.page === page);

  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };
  const stageRef = useRef<any>(null);
  useEffect(() => {
    const stage = stageRef.current.getStage();
    stage.container().addEventListener("dragover", (e: any) => {
      e.preventDefault();
      // console.log("over", e);
    });
    stage.container().addEventListener("drop", (e: any) => {
      const file = e.dataTransfer.files[0];
      console.log(file);
      e.stopPropagation();
      e.preventDefault();
    });
  }, []);
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
      <Stage width={1200} height={800} className="border-2" ref={stageRef}>
        <Layer>
          {imageList?.imgList.map((item, index) => (
            <AlbumImageByPage imageInfo={item} key={index} />
          ))}
        </Layer>
      </Stage>
    </section>
  );
};

export default AlbumSection;
