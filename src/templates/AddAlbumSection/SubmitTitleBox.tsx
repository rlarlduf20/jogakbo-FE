"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TitleInputBox from "./TitleInputBox";
import AddButton from "./AddButton";
import { TrapeButton } from "@/components/Trapezoid";
import LoadingGIF from "@/components/LoadingGIF";

const SubmitTitleBox = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputTitle = (value: string) => {
    setTitle(value);
  };
  const handleBack = () => {
    router.back();
  };

  return (
    <>
      {isLoading && (
        <LoadingGIF>
          <p className="text-center">
            앨범이 생성되었습니다.
            <br /> 잠시만 기다려주세요.
          </p>
        </LoadingGIF>
      )}
      <TitleInputBox title={title} handleInputTitle={handleInputTitle} />
      <div className="flex gap-[60px] w-full justify-center">
        <TrapeButton type="outline" handleClick={handleBack}>
          취소
        </TrapeButton>
        <AddButton
          title={title}
          handleInputTitle={handleInputTitle}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  );
};

export default SubmitTitleBox;
