"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

const SearchBox = () => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    console.log("debounced", debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <div>
      <input
        placeholder="검색하기"
        value={searchText}
        onChange={handleSearch}
        className="block pl-[6px] pb-[6px] bg-main_black w-[200px]
        border-b-[1px] border-white text-[18px] 
        outline-none"
      />
    </div>
  );
};

export default SearchBox;
