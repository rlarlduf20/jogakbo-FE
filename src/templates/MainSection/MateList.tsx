"use client";

import Trapezoid from "@/components/Trapezoid";
import { mockFriendsList } from "@/assets/mockData";

const MateList = () => {
  return (
    <div className="h-[250px] overflow-scroll">
      {mockFriendsList.map((item, index) => (
        <div key={index} className="flex items-center mb-[20px]">
          <Trapezoid
            styles={{
              width: "40px",
              height: "40px",
              clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
              position: "relative",
              bgColor: "white",
            }}
          />
          <p className="ml-[10px] grow text-[14px]">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MateList;
