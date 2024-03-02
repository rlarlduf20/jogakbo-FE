import { useEffect, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import type { ImageType } from "@/types";
import { getImageMinMaxValue } from "@/lib/getImgValue";

interface ImageByPagePropsType {
  imageInfo: ImageType;
  bodyData: ImageType[];
  // reLocArr: (data: ImageType[]) => void;
  index: number;
  selectedImageId: string | null;
  albumID: string;
  pageNum: number;
  isSelected: boolean;
  onSelect: () => void;
  onChangeAttrs: (data: ImageType) => void;
}
interface TransformedBoxType {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

const ImagesByPage = ({
  bodyData,
  imageInfo,
  isSelected,
  selectedImageId,
  index,
  // reLocArr,
  albumID,
  pageNum,
  onSelect,
  onChangeAttrs,
}: ImageByPagePropsType) => {
  const [image] = useImage(
    `${process.env.NEXT_PUBLIC_S3_URL}${albumID}/${imageInfo.albumImageUUID}`
  );
  const imageRef = useRef<any>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const [transformedBox, setTransformedBox] = useState<TransformedBoxType>();

  useEffect(() => {
    if (isSelected) {
      trRef.current?.nodes([imageRef?.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);
  useEffect(() => {
    const handleKeyDown = async (e: any) => {
      if (e.key === "Backspace" && isSelected) {
        // const data = [...bodyData];
        // const newData = data.filter(
        //   (item) => item.imageUUID !== selectedImageId
        // );
        // reLocArr(newData);
        // setSelectedImage(null);
        const res = await fetch(`/api/image/${albumID}`, {
          method: "DELETE",
          body: JSON.stringify({ imageUUID: selectedImageId }),
        });
        if (!res.ok) {
          alert("다시 시도해주세요.");
          return;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSelected, albumID, pageNum, selectedImageId]);

  return (
    <>
      <Image
        ref={imageRef}
        image={image}
        x={imageInfo.location.x}
        y={imageInfo.location.y}
        width={imageInfo.size.width}
        height={imageInfo.size.height}
        rotation={imageInfo.rotation}
        alt="img"
        draggable
        onClick={onSelect}
        onTap={onSelect}
        // onDragStart={() => {
        //   const data = [...bodyData];
        //   data.splice(index, 1);
        //   data.push(imageInfo);
        //   reLocArr(data);
        // }}
        onDragMove={(e) => {
          const node = imageRef.current;
          const image = getImageMinMaxValue({
            ...e.target.attrs,
            rotation: transformedBox?.rotation,
          });
          if (transformedBox) {
            if (image.y < 0) {
              e.target.y(e.target.y() - image.y);
            }
            if (image.x < 0) {
              e.target.x(e.target.x() - image.x);
            }
            if (image.y + image.height > 800) {
              e.target.y(e.target.y() - (image.y + image.height - 800));
            }
            if (image.x + image.width > 1200) {
              e.target.x(e.target.x() - (image.x + image.width - 1200));
            }
          } else {
            e.target.y(Math.max(e.target.y(), 0));
            e.target.x(Math.max(e.target.x(), 0));
            e.target.y(Math.min(e.target.y(), 800 - imageInfo.size.height));
            e.target.x(Math.min(e.target.x(), 1200 - imageInfo.size.width));
          }

          onChangeAttrs({
            ...imageInfo,
            location: {
              x: e.target.x(),
              y: e.target.y(),
            },
            size: {
              width: node.width(),
              height: node.height(),
            },
          });
        }}
        // onDragEnd={(e) => {
        //   const node = imageRef.current;
        // onChangeAttrs({
        //   ...imageInfo,
        //   location: {
        //     x: e.target.x(),
        //     y: e.target.y(),
        //   },
        //   size: {
        //     width: node.width(),
        //     height: node.height(),
        //   },
        // });
        // 서버에 바뀐 정보를 포함한 전체 이미지 전송
        // console.log(bodyData);
        // }}
        onTransform={(e) => {
          const node = imageRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChangeAttrs({
            ...imageInfo,
            location: {
              x: node.x(),
              y: node.y(),
            },
            rotation: node.rotation(),
            size: {
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            },
          });
        }}
        // onTransformEnd={(e) => {
        //   const node = imageRef.current;
        //   const scaleX = node.scaleX();
        //   const scaleY = node.scaleY();
        //   node.scaleX(1);
        //   node.scaleY(1);
        //   onChangeAttrs({
        //     ...imageInfo,
        //     location: {
        //       x: node.x(),
        //       y: node.y(),
        //     },
        //     rotation: node.rotation(),
        //     size: {
        //       width: Math.max(5, node.width() * scaleX),
        //       height: Math.max(node.height() * scaleY),
        //     },
        //   });
        //   // 서버에 바뀐 정보를 포함한 전체 이미지 전송
        //   // console.log(bodyData);
        // }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={[
            // "top-left",
            // "top-right",
            // "bottom-left",
            "bottom-right",
          ]}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            const box = getImageMinMaxValue(newBox);
            const isOut =
              box.x < 0 ||
              box.y < 0 ||
              box.x + box.width > 1200 ||
              box.y + box.height > 800;
            if (isOut) {
              return oldBox;
            }
            setTransformedBox(newBox);
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default ImagesByPage;
