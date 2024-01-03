import Link from "next/link";

const AddAlbum = () => {
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
      <div className="w-full mb-[90px]">
        <input
          placeholder="새 조각보 이름"
          className="block mx-auto pb-[13.5px] bg-main_black w-[200px] h-[50px] 
          border-b-[1px] border-white placeholder:text-white font-medium text-[18px] 
          outline-none text-center"
        />
      </div>
      <div className="flex gap-[60px] w-full justify-center">
        <Link href="/" className="font-medium">
          취소
        </Link>
        <Link href="/album" className="font-medium">
          만들기
        </Link>
      </div>
    </div>
  );
};

export default AddAlbum;
