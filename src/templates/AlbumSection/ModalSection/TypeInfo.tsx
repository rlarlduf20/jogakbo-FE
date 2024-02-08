import { useState } from "react";

interface TypeInfoPropsType {
  info: {
    albumName: string;
    createdDate: string;
    thumbnailImage: string;
  };
  isEditStat: boolean;
  thumbnail: any;
  handleChangeInput: (t: string) => void;
  upLoadImage: any;
}

const TypeInfo = ({
  info,
  isEditStat,
  handleChangeInput,
  thumbnail,
  upLoadImage,
}: TypeInfoPropsType) => {
  const [isHoverProfile, setIsHoverProfile] = useState<boolean>(false);
  const { createdDate } = info;
  const createdDateFormat =
    createdDate.slice(0, 4) +
    "." +
    createdDate.slice(5, 7) +
    "." +
    createdDate.slice(8, 10);
  console.log(info);
  return (
    <section className="flex h-[330px]">
      <div className="grow">
        <p className=" text-[18px] mb-[10px]">조각보 표지</p>
        <div className="flex gap-[25px]">
          <div
            onMouseOver={() => setIsHoverProfile(true)}
            onMouseLeave={() => setIsHoverProfile(false)}
            className="relative w-[112px] h-[280px] bg-white 
          [clipPath:polygon(0%_0%,75%_0%,100%_100%,0%_100%)]
          bg-cover bg-center border-[1px] border-white
           "
            style={{
              backgroundImage: `${
                thumbnail === info.thumbnailImage
                  ? `url(${thumbnail && process.env.NEXT_PUBLIC_S3_URL}${
                      info.thumbnailImage
                    })`
                  : `url(${info.thumbnailImage})`
              }`,
            }}
          >
            <input
              id="uploadImg"
              type="file"
              accept="image/*"
              onChange={upLoadImage}
              className="hidden"
            />
            {isHoverProfile && isEditStat && (
              <label
                htmlFor="uploadImg"
                className="z-30 bg-main_black_opacity cursor-pointer 
                w-full h-full flex justify-center items-center"
              >
                <p className="text-[20px] font-semibold">수정</p>
              </label>
            )}
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
