import Konva from "konva";
import React from "react";
import { useEffect, useState } from "react";

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
    const handleDrop = (e: any) => {
      const files = e.dataTransfer?.files;
      setIsDragging(false);
      e.stopPropagation();
      e.preventDefault();

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
        console.log(files);
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
