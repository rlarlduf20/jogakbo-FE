"use client";
import { useRef, useState } from "react";
import { albumMockDataList } from "./assets/mockData";
import Konva from "konva";
import { Layer, Stage } from "react-konva";
import ImagesByPage from "./components/ImagesByPage";
import AlbumInfo from "./components/AlbumInfo";
import { useDragExternalFiles } from "./lib/hooks";
import type { ImageType } from "./types";

const AlbumSection = () => {
  const [page, setPage] = useState<number>(0);
  const [albumBodyData, setAlbumBodyData] =
    useState<ImageType[][]>(albumMockDataList);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const isDragging = useDragExternalFiles(stageRef);

  const imageFocus = (
    e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedImageId(null);
    }
  };

  const movePrevPage = () => {
    setSelectedImageId(null);
    setPage((prev) => prev - 1);
  };
  const moveNextPage = () => {
    setSelectedImageId(null);
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
        onMouseDown={(e) => imageFocus(e)}
        onTouchStart={(e) => imageFocus(e)}
      >
        <Layer>
          {albumBodyData[page].map((item, index) => (
            <ImagesByPage
              bodyData={albumBodyData[page]}
              imageInfo={item}
              index={index}
              key={item.id}
              selectedImageId={selectedImageId}
              isSelected={item.id === selectedImageId}
              onSelect={() => {
                setSelectedImageId(item.id);
              }}
              onChangeAttrs={(newAttrs: ImageType) => {
                setAlbumBodyData((prevData) => {
                  const newData = [...prevData];
                  newData[page][index] = newAttrs;

                  return newData;
                });
              }}
              reLocArr={(newImageArr: ImageType[]) => {
                setAlbumBodyData((prevData) => {
                  const newData = [...prevData];
                  newData[page] = newImageArr;

                  return newData;
                });
              }}
            />
          ))}
        </Layer>
      </Stage>
    </section>
  );
};

export default AlbumSection;
