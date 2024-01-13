import Image from "next/image";
import Link from "next/link";
import SubmitTitleBox from "./SubmitTitleBox";
import PlusIcon from "../../../public/images/svg/plus.svg";

const AddAlbumSection = () => {
  return (
    <div
      className="w-[550px] h-[350px] border-[1px] border-white 
    py-[23px] px-[30px] bg-main_black"
    >
      <div className="flex items-center gap-[6px] mb-[97px]">
        <Image src={PlusIcon} alt="추가 아이콘" width={24} height={24} />
        <p className="text-[20px] font-semibold">새 조각보 만들기</p>
      </div>
      <SubmitTitleBox>
        <Link href="/">취소</Link>
      </SubmitTitleBox>
    </div>
  );
};

export default AddAlbumSection;
