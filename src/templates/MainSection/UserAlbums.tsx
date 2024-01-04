import Link from "next/link";
import AlbumList from "./AlbumList";

const UserAlbums = () => {
  return (
    <div className="w-full pb-[80px]">
      <div className="mb-[30px]">
        <Link href="/addAlbum" scroll={false} className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M5.5 0V16H11.5L9.7 0H5.5Z" fill="white" />
            <path
              d="M16 5.5L0 5.5L-2.62268e-07 11.5L16 9.7L16 5.5Z"
              fill="white"
            />
          </svg>
          <p className="ml-[5px]">새로운 조각보 만들기</p>
        </Link>
      </div>
      <div className="flex flex-wrap w-[800px] gap-y-[10px]">
        <AlbumList />
      </div>
    </div>
  );
};

export default UserAlbums;
