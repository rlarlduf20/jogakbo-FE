import Image from "next/image";
import Link from "next/link";

import PlusIcon from "../../../public/images/svg/plus.svg";
import MateList from "./MateList";
import { FriendsType } from "@/types";
import UpdateButton from "@/components/UpdateButton";

interface MateBoxPropsType {
  mateList: FriendsType[];
}

const MateBox = ({ mateList }: MateBoxPropsType) => {
  return (
    <div className="mt-[56px]">
      <div className="flex items-center mb-[28px]">
        <p className="text-[18px] mr-[5px]">친구 목록</p>
        <UpdateButton />
        <div>
          <Link href="/addMate" scroll={false} className="flex items-center">
            <Image src={PlusIcon} alt="추가" />
            <p className="text-[14px] ml-[4px]">추가</p>
          </Link>
        </div>
      </div>
      <MateList mateList={mateList} />
    </div>
  );
};

export default MateBox;
