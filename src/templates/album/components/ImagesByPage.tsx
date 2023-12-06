import { useEffect, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";
import { Portal } from "react-konva-utils";
import useImage from "use-image";

interface ImagePropType {
  bodyData: any;
  imageInfo: {
    src: string;
    location: {
      xPos: number;
      yPos: number;
    };
    size: {
      width: number;
      height: number;
    };
    rotation: number;
  };
  isSelected: boolean;
  onSelect: () => void;
  onChange: (e: any) => void;
}

const getCorner = (
  pivotX: number,
  pivotY: number,
  diffX: number,
  diffY: number,
  angle: number
) => {
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);

  /// find angle from pivot to corner
  angle += Math.atan2(diffY, diffX);

  /// get new x and y and round it off to integer
  const x = pivotX + distance * Math.cos(angle);
  const y = pivotY + distance * Math.sin(angle);

  return { x: x, y: y };
};
const getImage = (rotatedImg: any) => {
  const { x, y, width, height } = rotatedImg;
  const rad = rotatedImg.rotation;

  const p1 = getCorner(x, y, 0, 0, rad);
  const p2 = getCorner(x, y, width, 0, rad);
  const p3 = getCorner(x, y, width, height, rad);
  const p4 = getCorner(x, y, 0, height, rad);

  const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
  const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

const ImagesByPage = ({
  bodyData,
  imageInfo,
  isSelected,
  onSelect,
  onChange,
}: ImagePropType) => {
  const [isDragging, setIsDragging] = useState(false);
  const [image] = useImage(imageInfo.src);
  const imageRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Portal selector=".top-layer" enabled={isDragging}>
        <Image
          ref={imageRef}
          image={image}
          x={imageInfo.location.xPos}
          y={imageInfo.location.yPos}
          width={imageInfo.size.width}
          height={imageInfo.size.height}
          rotation={imageInfo.rotation}
          alt="img"
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragStart={() => {
            setIsDragging(true);
            console.log(isDragging);
          }}
          onDragMove={(e) => {
            e.target.y(Math.max(e.target.y(), 0));
            e.target.x(Math.max(e.target.x(), 0));
            e.target.y(Math.min(e.target.y(), 800 - imageInfo.size.height));
            e.target.x(Math.min(e.target.x(), 1200 - imageInfo.size.width));
          }}
          onDragEnd={(e) => {
            setIsDragging(false);
            const node = imageRef.current;
            onChange({
              ...imageInfo,
              location: {
                xPos: e.target.x(),
                yPos: e.target.y(),
              },
              size: {
                width: node.width(),
                height: node.height(),
              },
            });
            // 서버에 바뀐 정보를 포함한 전체 이미지 전송
            console.log(bodyData);
          }}
          onTransformEnd={(e) => {
            const node = imageRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...imageInfo,
              location: {
                xPos: node.x(),
                yPos: node.y(),
              },
              rotation: node.rotation(),
              size: {
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(node.height() * scaleY),
              },
            });
            // 서버에 바뀐 정보를 포함한 전체 이미지 전송
            console.log(bodyData);
          }}
        />
      </Portal>
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          // boundBoxFunc={(oldBox, newBox) => {
          //   if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
          //     return oldBox;
          //   }
          //   return newBox;
          // }}
          boundBoxFunc={(oldBox, newBox) => {
            const box = getImage(newBox);
            const isOut =
              box.x < 0 ||
              box.y < 0 ||
              box.x + box.width > 1200 ||
              box.y + box.height > 800;

            // if new bounding box is out of visible viewport, let's just skip transforming
            // this logic can be improved by still allow some transforming if we have small available space
            if (isOut) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default ImagesByPage;
