"use client";
import { useRef, useState } from "react";
import { albumMockDataList } from "./assets/mockData";
import Konva from "konva";
import { Layer, Stage } from "react-konva";
import ImagesByPage from "./components/ImagesByPage";
import AlbumInfo from "./components/AlbumInfo";
import { useDragExternalFiles } from "./hooks/useDragExternalFiles";

const AlbumSection = () => {
  const [page, setPage] = useState(0);
  const [albumBodyData, setAlbumBodyData] = useState(albumMockDataList);
  const [selectedImageId, setSelectedImageId] = useState<any>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const isDragging = useDragExternalFiles(stageRef);

  const imageFocus = (e: any) => {
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
  console.log(albumBodyData);
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
              onChange={(newAttrs: any) => {
                setAlbumBodyData((prevData) => {
                  const newData = [...prevData];
                  newData[page][index] = newAttrs;

                  return newData;
                });
              }}
              sortArr={(data: any) => {
                setAlbumBodyData((prevData) => {
                  const newData = [...prevData];
                  newData[page] = data;

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
