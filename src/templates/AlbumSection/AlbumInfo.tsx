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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
        >
          <g clipPath="url(#clip0_325_313)">
            <path
              d="M16.8417 25.1584L25.075 25.9834L27.6583 0.166748H14.3417L16.8417 25.1584Z"
              fill="white"
            />
            <path
              d="M12.6666 0.166748H0.166626V23.4917L15.15 24.9918L12.6666 0.166748Z"
              fill="white"
            />
            <path
              d="M0.166626 25.1667V41.8334H23.4916L24.5666 31.0917L24.65 30.2584L24.7333 29.4251L24.9083 27.6417L0.166626 25.1667Z"
              fill="white"
            />
            <path
              d="M29.3333 0.166748L25.1666 41.8334H41.8333V0.166748H29.3333Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_325_313">
              <rect
                width="41.6667"
                height="41.6667"
                fill="white"
                transform="translate(0.166626 0.166748)"
              />
            </clipPath>
          </defs>
        </svg>
        <div className="grow ml-[11px] text-[20px]">
          {"제목이 들어갈 자리입니다"}
        </div>
        <div className="flex mr-[61px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="24"
            viewBox="0 0 10 24"
            fill="none"
          >
            <path d="M0 0V24H10L7 0H0Z" fill="white" />
          </svg>
          <p className="ml-[3px]">정보</p>
        </div>
        <div className="flex mr-[47px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="24"
            viewBox="0 0 10 24"
            fill="none"
          >
            <path d="M0 0V24H10L7 0H0Z" fill="white" />
          </svg>
          <p className="ml-[3px]">구성원</p>
        </div>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="24"
            viewBox="0 0 10 24"
            fill="none"
          >
            <path d="M0 0V24H10L7 0H0Z" fill="white" />
          </svg>
          <Link href="/" className="ml-[3px]">
            내 조각보
          </Link>
        </div>
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
