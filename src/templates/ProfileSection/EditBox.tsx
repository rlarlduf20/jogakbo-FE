"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Trapezoid from "@/components/Trapezoid";

interface EditBoxPropsType {
  nickname: string;
  profileImageUrl: string;
}

const EditBox = ({ nickname, profileImageUrl }: EditBoxPropsType) => {
  const [isHoverProfile, setIsHoverProfile] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<any>(profileImageUrl);
  const [name, setName] = useState<string>(nickname);
  const [imageFile, setImageFile] = useState<any>();
  const disabledEditByNameLength = name.length < 2 || name.length > 10;
  const disabledNotChange = name === nickname && profileImageUrl === profileImg;
  const router = useRouter();

  const upLoadImage = (e: any) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);

    reader.onloadend = () => {
      setProfileImg(reader.result);
      setImageFile(uploadFile);
    };
  };

  const handleEdit = async () => {
    const formData = new FormData();

    if (imageFile === undefined) {
      formData.append("profileImage", "");
    } else {
      formData.append("profileImage", imageFile);
    }
    formData.append("newNickname", name);
    const res = await fetch("/api/profile", { method: "PUT", body: formData });

    if (res.ok) {
      alert("수정되었습니다.");
      router.refresh();
      return;
    }
    alert("다시 시도해주세요.");
    console.log(res);
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <div
          onMouseOver={() => setIsHoverProfile(true)}
          onMouseLeave={() => setIsHoverProfile(false)}
          className="relative w-[180px] h-[180px] bg-white 
          [clipPath:polygon(0%_0%,100%_0%,100%_90%,0%_100%)]
          bg-cover bg-center border-[1px] border-white
           "
          style={{
            backgroundImage: `${
              profileImageUrl === profileImg
                ? `url(${
                    profileImg && process.env.NEXT_PUBLIC_S3_URL
                  }${profileImg})`
                : `url(${profileImg})`
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
          {isHoverProfile && (
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
      <div className="mb-[30px]">
        <p className="text-[18px] mt-[20px]">이름</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block mx-auto bg-main_black w-[180px] h-[50px] 
        border-b-[1px] border-white placeholder:text-white text-[18px] 
        outline-none text-center"
        />
        <label
          className={`text-[12px] ${
            disabledEditByNameLength && "text-main_pink"
          }`}
        >
          2-10자로 설정해주세요.
        </label>
      </div>
      <Trapezoid
        styles={{
          width: "78px",
          height: "32px",
          clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0% 100%)",
          bgColor: "white",
        }}
      >
        <button
          disabled={disabledEditByNameLength || disabledNotChange}
          className="w-full h-full"
          onClick={handleEdit}
        >
          <p className="text-main_black text-center pt-[5.5px]">수정</p>
        </button>
      </Trapezoid>
    </div>
  );
};

export default EditBox;
