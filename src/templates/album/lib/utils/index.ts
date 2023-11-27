export const renderCanvas = (
  dataList: any,
  canvasRef: any,
  currentPage: number
) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const currentPageData = dataList.find(
    (data: any) => data.page === currentPage
  );

  if (currentPageData) {
    currentPageData.imgList.forEach(({ src, locationX, locationY }: any) => {
      if (src) {
        const image = new Image();
        image.src = src;
        image.onload = () => {
          ctx.drawImage(image, locationX, locationY);
        };
      }
    });
  }
};
