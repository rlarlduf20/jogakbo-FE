"use client";
import { useState } from "react";
import TitleInputBox from "./TitleInputBox";
import AddButton from "./AddButton";

const SubmitTitleBox = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState<string>("");
  const handleInputTitle = (value: string) => {
    setTitle(value);
  };
  return (
    <>
      <TitleInputBox title={title} handleInputTitle={handleInputTitle} />
      <div className="flex gap-[60px] w-full justify-center">
        {children}
        <AddButton title={title} handleInputTitle={handleInputTitle} />
      </div>
    </>
  );
};

export default SubmitTitleBox;
