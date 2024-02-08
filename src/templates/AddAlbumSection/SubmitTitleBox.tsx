"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TitleInputBox from "./TitleInputBox";
import AddButton from "./AddButton";
import { TrapeButton } from "@/components/Trapezoid";

const SubmitTitleBox = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");

  const handleInputTitle = (value: string) => {
    setTitle(value);
  };
  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <TitleInputBox title={title} handleInputTitle={handleInputTitle} />
      <div className="flex gap-[60px] w-full justify-center">
        <TrapeButton type="outline" handleClick={handleBack}>
          취소
        </TrapeButton>
        <AddButton title={title} handleInputTitle={handleInputTitle} />
      </div>
    </>
  );
};

export default SubmitTitleBox;
