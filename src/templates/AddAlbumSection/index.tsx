import Link from "next/link";
import SubmitTitleBox from "./SubmitTitleBox";

const AddAlbumSection = () => {
  return (
    <div
      className="w-[550px] h-[350px] border-[1px] border-white 
    py-[23px] px-[30px] bg-main_black "
    >
      <div className="flex items-center gap-[6px] mb-[97px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M5.5 0V16H11.5L9.7 0H5.5Z" fill="white" />
          <path
            d="M16 5.5L0 5.5L-2.62268e-07 11.5L16 9.7L16 5.5Z"
            fill="white"
          />
        </svg>
        <p className="text-[20px] font-semibold">새 조각보 만들기</p>
      </div>
      <SubmitTitleBox>
        <Link href="/" className="font-medium">
          취소
        </Link>
      </SubmitTitleBox>
    </div>
  );
};

export default AddAlbumSection;
