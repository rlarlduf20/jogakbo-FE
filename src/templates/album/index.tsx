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
  const [albumBodyData, setAlbumBodyData] = useState(albumMockDataList);
  const [selectImage, setSelectImage] = useState<any>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const isDragging = useDragExternalFiles(stageRef);
  const albumBodyDataByPage = albumBodyData.find(
    (data: any) => data.page === page
  );

  const imageFocus = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectImage(null);
    }
  };

  const movePrevPage = () => {
    setSelectImage(null);
    setPage((prev) => prev - 1);
  };
  const moveNextPage = () => {
    setSelectImage(null);
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
          {albumBodyDataByPage?.imgList.map((item, index) => (
            <ImagesByPage
              imageInfo={item}
              key={index}
              isSelected={item.id === selectImage}
              onSelect={() => {
                setSelectImage(item.id);
              }}
              onChange={(newAttrs: any) => {
                setAlbumBodyData((prevData) => {
                  console.log(newAttrs);
                  const newData = [...prevData];
                  newData[page - 1].imgList[index] = newAttrs;
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
