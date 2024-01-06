import Link from "next/link";
import Image from "next/image";
import AlbumList from "./AlbumList";
import type { AlbumsType } from "@/types";
import PlusIcon from "../../../public/images/svg/plus.svg";
import SortIcon from "../../../public/images/svg/sort-trapezoid.svg";
import OwnerSortIcon from "../../../public/images/svg/sort-rectangle.svg";

interface UserAlbumsProps {
  albums: AlbumsType[];
}
const UserAlbums = ({ albums }: UserAlbumsProps) => {
  return (
    <div className="w-[790px] min-h-[800px] pb-[80px]">
      <div className="flex mb-[30px] gap-[30px]">
        <div className="flex gap-[5px]">
          <Image src={SortIcon} alt="정렬 아이콘" />
          <p>정렬</p>
        </div>
        <div className="flex gap-[5px]">
          <Image src={SortIcon} alt="정렬 아이콘" />
          <p>분류</p>
        </div>
        <div className="flex gap-[5px] grow ml-[-">
          <Image src={OwnerSortIcon} alt="정렬 아이콘" />
          <p>내가 만든 조각보만 보기</p>
        </div>
        <Link
          href="/addAlbum"
          scroll={false}
          className="flex gap-[5px] items-center"
        >
          <Image src={PlusIcon} alt="추가 아이콘" />
          <p>새로운 조각보 만들기</p>
        </Link>
      </div>
      <div className="flex flex-wrap w-[800px] gap-y-[10px]">
        <AlbumList albums={albums} />
      </div>
    </div>
  );
};

export default UserAlbums;
