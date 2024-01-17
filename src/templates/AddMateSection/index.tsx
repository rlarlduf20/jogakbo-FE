import SearchBox from "./SearchBox";

const AddMateSection = () => {
  return (
    <div
      className="w-[350px] h-[550px] border-[1px] border-white
        py-[23px] px-[30px] bg-main_black"
    >
      <p className="text-[20px] font-semibold mb-[10px]">친구 추가하기</p>
      <SearchBox />
    </div>
  );
};

export default AddMateSection;
