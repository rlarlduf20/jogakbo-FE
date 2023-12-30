import { albumInfo } from "@/templates/album/assets/mockData";
import Link from "next/link";

const UserAlbums = () => {
  return (
    <div className="w-full">
      <div className="mb-[30px]">
        <Link href="/album" className="flex items-center">
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
      <div className="flex gap-[10px] border border-white-500 w-full h-[500px]">
        {albumInfo.map((item, index) => (
          <div key={index} className="w-[70px] h-[200px] bg-slate-300">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAlbums;
