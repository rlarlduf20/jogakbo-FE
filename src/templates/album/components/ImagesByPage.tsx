import { Image } from "react-konva";
import useImage from "use-image";

interface ImagePropType {
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
  };
}

const ImagesByPage = ({ imageInfo }: ImagePropType) => {
  const [image] = useImage(imageInfo.src);

  return (
    <Image
      image={image}
      x={imageInfo.location.xPos}
      y={imageInfo.location.yPos}
      alt="img"
      draggable
    />
  );
};

export default ImagesByPage;
