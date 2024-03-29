"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrapeButton } from "@/components/Trapezoid";

interface EditBoxPropsType {
  nickname: string;
  profileImageUrl: string;
  socialId: string;
}

const EditBox = ({ nickname, profileImageUrl, socialId }: EditBoxPropsType) => {
  const router = useRouter();
  const [isHoverProfile, setIsHoverProfile] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<any>(profileImageUrl);
  const [name, setName] = useState<string>(nickname);
  const [imageFile, setImageFile] = useState<any>();
  const disabledEditByNameLength = name.length < 2 || name.length > 10;
  const disabledNotChange = name === nickname && profileImageUrl === profileImg;

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
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <div
          onMouseOver={() => setIsHoverProfile(true)}
          onMouseLeave={() => setIsHoverProfile(false)}
          className="relative w-[180px] h-[180px] bg-white 
          [clipPath:polygon(0%_0%,100%_0%,100%_90%,0%_100%)]
          bg-cover bg-center
           "
          style={{
            backgroundImage: `${
              profileImageUrl === profileImg
                ? `url(${
                    profileImg && process.env.NEXT_PUBLIC_S3_URL
                  }${socialId}/${profileImg})`
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
          placeholder="이름을 입력해주세요."
          className="block mx-auto bg-main_black w-[180px] h-[50px] 
        border-b-[1px] border-white placeholder:text-[#888]] text-[18px] 
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
      <TrapeButton
        disabled={disabledEditByNameLength || disabledNotChange}
        handleClick={handleEdit}
      >
        수정
      </TrapeButton>
    </div>
  );
};

export default EditBox;
