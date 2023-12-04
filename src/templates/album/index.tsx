"use client";
import { useEffect, useRef, useState } from "react";
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

  const [selectImage, setSelectImage] = useState<any>(null);
  const imageFocus = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectImage(null);
    }
  };
  useEffect(() => {
    console.log(images);
  }, [images]);
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
        onMouseDown={(e) => imageFocus(e)}
        onTouchStart={(e) => imageFocus(e)}
      >
        <Layer>
          {imageList?.imgList.map((item, index) => (
            <ImagesByPage
              imageInfo={item}
              key={index}
              isSelected={item.id === selectImage}
              onSelect={() => {
                setSelectImage(item.id);
              }}
              onChange={(newAttrs: any) => {
                setImages((prevData) => {
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
