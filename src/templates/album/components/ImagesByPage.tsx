import { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
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

const ImagesByPage = ({
  bodyData,
  imageInfo,
  isSelected,
  onSelect,
  onChange,
}: ImagePropType) => {
  const [image] = useImage(imageInfo.src);
  const imageRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
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
        onDragEnd={(e) => {
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
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
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
