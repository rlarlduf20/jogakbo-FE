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
      const file = e.dataTransfer.files[0];
      console.log(file);
      setIsDragging(false);
      e.stopPropagation();
      e.preventDefault();
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
