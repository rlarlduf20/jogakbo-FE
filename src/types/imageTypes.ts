export interface ImageType {
  imageUUID: string;
  location: {
    x: number;
    y: number;
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
  // reLocArr: (data: ImageType[]) => void;
  index: number;
  selectedImageId: string | null;
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
