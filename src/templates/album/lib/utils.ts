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
export const getImageMinMaxValue = (rotatedImg: any) => {
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

export const parsingImagesSize = (
  files: any,
  position: any,
  id: number
): Promise<any[]> => {
  const promises = Array.from(files).map((file: any, index: number) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const image: any = new Image();
        image.src = reader.result as string;

        image.onload = () => {
          let resultObject = {};
          let x, y;
          let tmpWidth = image.width;
          let tmpHeight = image.height;
          if (image.width > 1200) {
            image.width = image.width / Math.ceil(tmpWidth / 1200);
            image.height = image.height / Math.ceil(tmpWidth / 1200);
          }
          if (image.height > 800) {
            image.width = image.width / Math.ceil(tmpHeight / 800);
            image.height = image.height / Math.ceil(tmpHeight / 800);
          }
          if (position.x + image.width > 1200) {
            x = 1200 - image.width;
          } else {
            x = position.x;
          }
          if (position.y + image.height > 800) {
            y = 800 - image.height;
          } else {
            y = position.y;
          }
          console.log("x,y", image.width, image.height);
          resultObject = {
            id: id + index + 1,
            src: image.src,
            size: { width: image.width, height: image.height },
            location: {
              xPos: x,
              yPos: y,
            },
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
