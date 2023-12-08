export interface ImageType {
  id: number;
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
}

export interface ImagePropsType {
  imageInfo: ImageType;
  bodyData: ImageType[];
  reLocArr: (data: ImageType[]) => void;
  index: number;
  selectedImageId: number | null;
  isSelected: boolean;
  onSelect: () => void;
  onChangeAttrs: (data: ImageType) => void;
}

export interface TransformedBoxType {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}
