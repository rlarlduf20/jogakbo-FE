import Image from "next/image";
import LoadingGIFIcon from "../../public/images/jogak_loading.gif";

const LoadingGIF = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="fixed z-30 flex flex-col gap-[10px] justify-center items-center top-0 left-0 w-full h-full bg-main_black bg-opacity-70">
      <Image src={LoadingGIFIcon} alt="로딩" width={80} height={80} />
      {children}
    </div>
  );
};

export default LoadingGIF;
