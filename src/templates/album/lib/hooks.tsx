import Konva from "konva";
import React from "react";
import { useEffect, useState } from "react";

const parsingImagesSize = (files: any): Promise<any[]> => {
  const promises = Array.from(files).map((file: any, index: number) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const image: any = new Image();
        image.src = reader.result as string;

        image.onload = () => {
          const resultObject = {
            id: index,
            src: image.src,
            size: { width: image.width, height: image.height },
            location: { xPos: 100, yPos: 100 },
            rotation: 0,
          };
          resolve(resultObject);
        };
      };

      reader.onerror = () => {
        reject(new Error(`파일 읽기 오류: ${file.name}`));
      };
    });
  });

  return Promise.all(promises);
};

export const useDragExternalFiles = (
  stageRef: React.RefObject<Konva.Stage>
) => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const stage = stageRef.current?.getStage();

    const handleDragOver = (e: any) => {
      setIsDragging(true);

      e.preventDefault();
    };
    const handleDrop = async (e: any) => {
      e.stopPropagation();
      e.preventDefault();

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
        const res = await parsingImagesSize(files);
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
  }, [stageRef]);

  return isDragging;
};
