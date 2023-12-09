"use client";
import { useRef, useState, useEffect } from "react";
import { albumMockDataList } from "./assets/mockData";
import Konva from "konva";
import { Layer, Stage } from "react-konva";
import ImagesByPage from "./components/ImagesByPage";
import AlbumInfo from "./components/AlbumInfo";
import type { ImageType } from "./types";
import { parsingImagesSize } from "./lib/utils";

const AlbumSection = () => {
  const [page, setPage] = useState<number>(0);
  const [albumBodyData, setAlbumBodyData] =
    useState<ImageType[][]>(albumMockDataList);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    const stage = stageRef.current?.getStage();
    const pushData = (data: any) => {
      setAlbumBodyData((prevData: any) => {
        const newData = [...prevData];
        newData[page] = newData[page].concat(data);

        return newData;
      });
    };
    const handleDragOver = (e: any) => {
      setIsDragging(true);

      e.preventDefault();
    };
    const handleDrop = async (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      stageRef.current?.setPointersPositions(e);
      setIsDragging(false);

      const files = e.dataTransfer?.files;

      if (files) {
        const isImageFile = Array.from(files).every((file: any) =>
          file.type.includes("image")
        );
        if (!isImageFile) {
          alert("이미지 파일만 업로드 가능합니다.");
          e.stopPropagation();
          e.preventDefault();
          return;
        }
        // 드랍한 외부 이미지 파일 정보 서버로 보내기
        const res = await parsingImagesSize(
          files,
          stageRef.current?.getPointerPosition(),
          albumBodyData[page].length - 1
        );
        pushData(res);
      }
    };
    const handleDragLeave = (e: any) => {
      setIsDragging(false);
      e.preventDefault();
    };

    stage?.container().addEventListener("dragover", handleDragOver);
    stage?.container().addEventListener("drop", handleDrop);
    stage?.container().addEventListener("dragleave", handleDragLeave);

    return () => {
      stage?.container().removeEventListener("dragover", handleDragOver);
      stage?.container().removeEventListener("drop", handleDrop);
      stage?.container().removeEventListener("dragleave", handleDragLeave);
    };
  }, [page, albumBodyData]);

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
