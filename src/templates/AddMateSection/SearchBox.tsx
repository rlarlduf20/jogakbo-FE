"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import type { SearchUsersType } from "@/types";
import { Trapezoid } from "@/components/Trapezoid";
import CloseButton from "./CloseButton";

const SearchBox = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchedUser, setSearchedUser] = useState<SearchUsersType[]>([]);
  const debouncedSearchText = useDebounce(searchText, 500);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleInvite = async (userID: string) => {
    const res = await fetch("/api/friend", {
      method: "POST",
      body: JSON.stringify({
        userID,
      }),
    });
    if (!res.ok) {
      alert("요청에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    alert("초대 메시지가 발송됐습니다.");
  };

  useEffect(() => {
    const getSearchedUserList = async () => {
      const res = await fetch("/api/searchUser", {
        method: "POST",
        body: JSON.stringify({
          debouncedSearchText,
        }),
      });
      const data = await res.json();
      setSearchedUser(data);
    };
    getSearchedUserList();
  }, [debouncedSearchText]);

  return (
    <div className="w-full">
      <input
        placeholder="검색"
        value={searchText}
        onChange={handleSearch}
        className="block bg-main_black w-[300px] h-[50px] pb-[5px]
        border-b-[1px] border-white text-[18px] text-center mb-[20px]
        outline-none placeholder:text-white"
      />
      <div className="h-[322px] overflow-scroll mb-[45px]">
        {!searchText ? (
          <p className="text-[14px]">
            친구를 추가하고 함께 조각을 완성해 보세요.
          </p>
        ) : searchedUser.length === 0 ? (
          <p className="text-[14px]">검색 결과가 없습니다.</p>
        ) : (
          <div>
            {searchedUser.map((item, index) => (
              <div key={index} className="relative flex items-center mb-[20px]">
                {(item.friendStatus === "WAITING" ||
                  item.friendStatus === "FRIEND") && (
                  <div className="absolute flex items-center justify-center w-full h-full bg-main_pink opacity-50">
                    <p>초대할수없는유저</p>
                  </div>
                )}
                <Trapezoid
                  styles={{
                    width: "40px",
                    height: "40px",
                    clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
                    position: "relative",
                    bgColor: "white",
                  }}
                />
                <div className="ml-[10px] grow">
                  <p>{item.friend.nickname}</p>
                  <p className="text-[14px] text-[#888]">
                    #{item.friend.socialID.slice(0, 6)}
                  </p>
                </div>
                <button
                  disabled={
                    item.friendStatus === "WAITING" ||
                    item.friendStatus === "FRIEND"
                  }
                  onClick={() => handleInvite(item.friend.socialID)}
                >
                  <p className="underline text-[14px]">요청</p>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <CloseButton />
    </div>
  );
};

export default SearchBox;
