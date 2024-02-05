import Image from "next/image";
import LoadingGIFIcon from "../../public/images/jogak_loading.gif";

const LoadingGIF = () => {
  return (
    <div className="fixed z-30 flex justify-center items-center top-0 left-0 w-full h-full bg-main_black bg-opacity-70">
      <Image src={LoadingGIFIcon} alt="로딩" width={80} height={80} />
    </div>
  );
};

export default LoadingGIF;
