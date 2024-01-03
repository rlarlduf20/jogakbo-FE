import Image from "next/image";
import Link from "next/link";

interface InfoPropType {
  page: number;
  movePrevPage: () => void;
  moveNextPage: () => void;
}

const AlbumInfo = ({ page, movePrevPage, moveNextPage }: InfoPropType) => {
  return (
    <>
      <header className="h-[80px] flex items-center">
        <Image
          src="/images/logo/temporary-logo-albumMakeup.png"
          alt="임시 로고"
          width={50}
          height={50}
        />
        <div className="grow ml-[11px] text-[20px]">
          {"제목이 들어갈 자리입니다"}
        </div>
        <Link href="/">내 조각보</Link>
      </header>
      <button
        className={`absolute left-[-50px] top-[410px] ${
          page > 0 && "hover:cursor-pointer"
        } ${page <= 0 && "text-red-500"}`}
        disabled={page <= 0}
        onClick={movePrevPage}
      >
        이전
      </button>
      <button
        className="absolute right-[-50px] top-[410px] hover:cursor-pointer"
        onClick={moveNextPage}
      >
        다음
      </button>
    </>
  );
};

export default AlbumInfo;
