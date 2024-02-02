import Image from "next/image";
import SearchBox from "./SearchBox";
import PlusIcon from "../../../public/images/svg/plus.svg";

const AddMateSection = () => {
  return (
    <div
      className="w-[360px] h-[600px] border-[1px] border-white
        pt-[23px] pb-[30px] px-[30px] bg-main_black"
    >
      <div className="flex gap-[6px] mb-[22px]">
        <Image src={PlusIcon} alt="추가" />
        <p className="text-[20px] font-semibold">친구 추가하기</p>
      </div>
      <SearchBox />
    </div>
  );
};

export default AddMateSection;
