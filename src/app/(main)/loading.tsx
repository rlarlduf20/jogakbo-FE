import Image from "next/image";
import LoadingGIF from "../../../public/images/jogak_loading.gif";

const Loading = () => {
  return (
    <div className="fixed z-30 flex justify-center items-center top-0 left-0 w-full h-full bg-main_black bg-opacity-70">
      <Image src={LoadingGIF} alt="로딩" width={80} height={80} />
    </div>
  );
};

export default Loading;
