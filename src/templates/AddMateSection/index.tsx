const AddMateSection = () => {
  return (
    <div
      className="w-[350px] h-[550px] border-[1px] border-white
        py-[23px] px-[30px] bg-main_black"
    >
      <div className="w-full mb-[90px]">
        <input
          placeholder="검색하기"
          className="block mx-auto pl-[6px] pb-[6px] bg-main_black w-[200px]
      border-b-[1px] border-white text-[18px] 
      outline-none"
        />
      </div>
    </div>
  );
};

export default AddMateSection;
