import Image from "next/image";
import { Trapezoid } from "@/components/Trapezoid";

const mockThumbnailImage = "/images/park.jpeg";

const TypeInfo = () => {
  return (
    <section className="flex pl-[10px] pr-[13px] h-[330px]">
      <div className="grow">
        <p className=" text-[18px] mb-[10px]">조각보 표지</p>
        <div className="flex gap-[25px]">
          <Trapezoid
            styles={{
              width: "80px",
              height: "200px",
              clipPath: "polygon(0% 0%, 75% 0%, 100% 100%, 0% 100%)",
              position: "relative",
            }}
          >
            <Image
              src={mockThumbnailImage}
              alt="thumbnail"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </Trapezoid>
          <div className="w-[150px] h-[200px] bg-white"></div>
        </div>
      </div>
      <div className="flex flex-col gap-[36px]">
        <div>
          <p className="text-[18px] mb-[3px]">조각보 이름</p>
          <input
            disabled
            value="조각보 이름"
            className="w-[172px] h-[50px] bg-main_black outline-none border-b-[1px] border-white text-[14px] text-center"
          />
        </div>
        <div>
          <p className="text-[18px] mb-[3px]">조각보 제작 날짜</p>
          <input
            disabled
            value="2023.10.04"
            className="w-[172px] h-[50px] bg-main_black outline-none border-b-[1px] border-white text-[14px] text-center"
          />
        </div>
        <div>
          <p className="text-[18px] mb-[3px]">공개 여부</p>
          <input
            disabled
            value="전체 공개"
            className="w-[172px] h-[50px] bg-main_black outline-none border-b-[1px] border-white text-[14px] text-center"
          />
        </div>
      </div>
    </section>
  );
};
export default TypeInfo;
