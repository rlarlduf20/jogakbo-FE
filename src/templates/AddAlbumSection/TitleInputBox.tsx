"use client";

const TitleInputBox = () => {
  return (
    <div className="w-full mb-[90px]">
      <input
        placeholder="새 조각보 이름"
        className="block mx-auto pb-[13.5px] bg-main_black w-[200px] h-[50px] 
      border-b-[1px] border-white placeholder:text-white font-medium text-[18px] 
      outline-none text-center"
      />
    </div>
  );
};

export default TitleInputBox;
