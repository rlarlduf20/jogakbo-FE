interface TitleInputBoxPropsType {
  title: string;
  handleInputTitle: (v: string) => void;
}

const TitleInputBox = ({ title, handleInputTitle }: TitleInputBoxPropsType) => {
  return (
    <div className="w-full mb-[90px]">
      <input
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputTitle(e.target.value)
        }
        placeholder="새 조각보 이름"
        className="block mx-auto pb-[13.5px] bg-main_black w-[200px] h-[50px] 
      border-b-[1px] border-white placeholder:text-white text-[18px] 
      outline-none text-center"
      />
    </div>
  );
};

export default TitleInputBox;
