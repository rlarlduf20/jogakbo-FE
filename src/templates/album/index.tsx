"use client";
import { useRef, useState } from "react";
import { albumMockDataList } from "./assets/mockData";
import Konva from "konva";
import { Layer, Stage } from "react-konva";
import ImagesByPage from "./components/ImagesByPage";
import AlbumInfo from "./components/AlbumInfo";
import { useDragExternalFiles } from "./hooks/useDragExternalFiles";

const AlbumSection = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(albumMockDataList);
  const imageList = images.find((data: any) => data.page === page);
  const stageRef = useRef<Konva.Stage>(null);
  const isDragging = useDragExternalFiles(stageRef);

  const movePrevPage = () => {
    setPage((prev) => prev - 1);
  };
  const moveNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section>
      <AlbumInfo
        page={page}
        movePrevPage={movePrevPage}
        moveNextPage={moveNextPage}
      />
      <Stage
        width={1200}
        height={800}
        className={`${isDragging ? "border-4" : "border-2"}`}
        ref={stageRef}
      >
        <Layer>
          {imageList?.imgList.map((item, index) => (
            <ImagesByPage imageInfo={item} key={index} />
          ))}
        </Layer>
      </Stage>
    </section>
  );
};

export default AlbumSection;
