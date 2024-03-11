import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Trapezoid, TrapeButton } from "@/components/Trapezoid";

interface TypeInfoPropsType {
  albumID: string;
}

const TypeInfo = ({ albumID }: TypeInfoPropsType) => {
  const [initInfo, setInitInfo] = useState<any>();
  const [albumName, setAlbumName] = useState<string>();
  const [thumbnailImageURL, setThumbnailImageURL] = useState<any>();
  const [createdDate, setCreatedDate] = useState<string>();
  const [isEditStat, setIsEditStat] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<any>();

  useEffect(() => {
    const getAlbumDetailInfo = async () => {
      const res = await fetch("/api/albumInfo/detail", {
        method: "POST",
        body: JSON.stringify({ albumID }),
      });
      const { albumName, thumbnailImageURL, createdDate } = await res.json();
      setInitInfo({ albumName, thumbnailImageURL });
      setAlbumName(albumName);
      setThumbnailImageURL(thumbnailImageURL);
      setCreatedDate(
        createdDate.slice(0, 4) +
          "." +
          createdDate.slice(5, 7) +
          "." +
          createdDate.slice(8, 10)
      );
    };
    getAlbumDetailInfo();
  }, [albumID]);

  const upLoadImage = (e: any) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setThumbnailImageURL(reader.result);
      setImageFile(uploadFile);
    };
    e.target.value = "";
  };

  const handleClickCancleBtn = () => {
    setIsEditStat(false);
    setAlbumName(initInfo.albumName);
    setThumbnailImageURL(initInfo.thumbnailImageURL);
    setImageFile(null);
  };

  const handleSubmitEdit = async () => {
    const formData = new FormData();

    if (imageFile === undefined) {
      formData.append("thumbnailImage", "");
    } else {
      formData.append("thumbnailImage", imageFile);
    }

    const res = await fetch(
      `/api/albumInfo?albumID=${albumID}&newTitle=${albumName}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (res.ok) {
      alert("수정되었습니다.");
      setIsEditStat(false);
      window.location.reload();
      return;
    }
    alert("수정 권한이 없습니다.");
  };

  return (
    <>
      <section className="flex h-[330px]">
        {!isEditStat && (
          <div
            className="absolute top-[26px] left-[165px] text-[14px] underline cursor-pointer"
            onClick={() => setIsEditStat(true)}
          >
            수정하기
          </div>
        )}
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
          <div className="flex gap-[60px]">
            <div
              className="relative w-[112px] h-[280px] bg-white 
              [clipPath:polygon(0%_0%,75%_0%,100%_100%,0%_100%)]
              bg-cover bg-center
           "
              style={
                thumbnailImageURL && {
                  backgroundImage: `${
                    thumbnailImageURL === initInfo.thumbnailImageURL
                      ? thumbnailImageURL &&
                        `url(${process.env.NEXT_PUBLIC_S3_URL}${albumID}/${thumbnailImageURL})`
                      : `url(${thumbnailImageURL})`
                  }`,
                }
              }
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
                {albumName}
              </p>
            </div>
            <div
              className="relative w-[200px] h-[280px] bg-white bg-cover bg-center"
              style={
                thumbnailImageURL && {
                  backgroundImage: `${
                    thumbnailImageURL === initInfo.thumbnailImageURL
                      ? thumbnailImageURL &&
                        `url(${process.env.NEXT_PUBLIC_S3_URL}${albumID}/${thumbnailImageURL})`
                      : `url(${thumbnailImageURL})`
                  }`,
                }
              }
            ></div>
          </div>
        </div>
        <div className="flex flex-col gap-[36px]">
          <div>
            <p className="text-[18px] mb-[3px]">조각보 이름</p>
            <input
              disabled={!isEditStat}
              value={albumName || ""}
              className={`w-[172px] h-[50px] bg-main_black outline-none border-b-[1px] border-white text-[14px]
             text-center ${isEditStat && "text-[#888]"}`}
              onChange={(e) => setAlbumName(e.target.value)}
            />
          </div>
          <div>
            <p className="text-[18px] mb-[3px]">조각보 제작 날짜</p>
            <input
              disabled
              value={createdDate || ""}
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
      <footer className="flex justify-center gap-[30px] pt-[20px]">
        {isEditStat ? (
          <>
            <TrapeButton type="outline" handleClick={handleClickCancleBtn}>
              취소
            </TrapeButton>
            <TrapeButton handleClick={handleSubmitEdit}>수정</TrapeButton>
          </>
        ) : (
          <>
            <Dialog.Close>
              <TrapeButton type="outline">닫기</TrapeButton>
            </Dialog.Close>
          </>
        )}
      </footer>
    </>
  );
};
export default TypeInfo;
