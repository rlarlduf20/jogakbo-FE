import { useState } from "react";
import { Trapezoid } from "@/components/Trapezoid";

interface TypeInfoPropsType {
  info: {
    albumName: string;
    createdDate: string;
    thumbnailImage: string;
  };
  isEditStat: boolean;
  thumbnail: any;
  albumID: string;
  handleChangeInput: (t: string) => void;
  upLoadImage: any;
}

const TypeInfo = ({
  info,
  isEditStat,
  handleChangeInput,
  thumbnail,
  albumID,
  upLoadImage,
}: TypeInfoPropsType) => {
  const { createdDate } = info;
  const createdDateFormat =
    createdDate.slice(0, 4) +
    "." +
    createdDate.slice(5, 7) +
    "." +
    createdDate.slice(8, 10);

  return (
    <section className="flex h-[330px]">
      <div className="grow">
        <div className="flex gap-[9px] items-center mb-[10px]">
          <p className="text-[18px]">조각보 표지</p>
          <input
            id="uploadImg"
            type="file"
            accept="image/*"
            onChange={upLoadImage}
            className="hidden"
          />
          {isEditStat && (
            <label htmlFor="uploadImg" className="cursor-pointer underline">
              <p className="text-[14px]">수정</p>
            </label>
          )}
        </div>
        <div className="flex gap-[25px]">
          <div
            className="relative w-[112px] h-[280px] bg-white 
              [clipPath:polygon(0%_0%,75%_0%,100%_100%,0%_100%)]
              bg-cover bg-center
           "
            style={{
              backgroundImage: `${
                thumbnail === info.thumbnailImage
                  ? `url(${
                      thumbnail && process.env.NEXT_PUBLIC_S3_URL
                    }${albumID}/${info.thumbnailImage})`
                  : `url(${info.thumbnailImage})`
              }`,
            }}
          >
            <Trapezoid
              styles={{
                width: "112px",
                height: "280px",
                clipPath: "polygon(0 0, 75% 0%, 100% 100%, 0% 100%)",
                bgColor: "rgba(21,21,21,0.3)",
                position: "absolute",
                zIndex: 10,
              }}
            />
            <p
              className="absolute rotate-90 font-semibold text-[24px] w-[280px] origin-top-left top-[30px]
                left-[50px] z-30"
            >
              {info.albumName}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[36px]">
        <div>
          <p className="text-[18px] mb-[3px]">조각보 이름</p>
          <input
            disabled={!isEditStat}
            value={info.albumName}
            className={`w-[172px] h-[50px] bg-main_black outline-none border-b-[1px] border-white text-[14px]
             text-center ${isEditStat && "text-[#888]"}`}
            onChange={(e) => handleChangeInput(e.target.value)}
          />
        </div>
        <div>
          <p className="text-[18px] mb-[3px]">조각보 제작 날짜</p>
          <input
            disabled
            value={createdDateFormat}
            className="w-[172px] h-[50px] bg-main_black outline-none border-b-[1px] border-white text-[14px] text-center"
          />
        </div>
        <div>
          <p className="text-[18px] mb-[3px]">공개 여부</p>
          <input
            disabled
            value="-"
            className="w-[172px] h-[50px] bg-main_black outline-none border-b-[1px] border-white text-[14px] text-center"
          />
        </div>
      </div>
    </section>
  );
};
export default TypeInfo;
