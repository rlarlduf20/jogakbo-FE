import Link from "next/link";
import Image from "next/image";
import AlbumList from "./AlbumList";
import type { AlbumsType } from "@/types";
import PlusIcon from "../../../public/images/svg/plus.svg";

interface UserAlbumsProps {
  albums: AlbumsType[];
}
const UserAlbums = ({ albums }: UserAlbumsProps) => {
  return (
    <div className="w-full min-h-[800px] pb-[80px]">
      <div className="mb-[30px]">
        <Link href="/addAlbum" scroll={false} className="flex items-center">
          <Image src={PlusIcon} alt="추가 아이콘" />
          <p className="ml-[5px]">새로운 조각보 만들기</p>
        </Link>
      </div>
      <div className="flex flex-wrap w-[800px] gap-y-[10px]">
        <AlbumList albums={albums} />
      </div>
    </div>
  );
};

export default UserAlbums;
