"use client";

import Image from "next/image";
import RefreshIcon from "../../public/images/svg/sort-rectangle.svg";

const UpdateButton = () => {
  return (
    <div className="grow">
      <Image
        src={RefreshIcon}
        alt="새로고침"
        width={18}
        height={18}
        className="cursor-pointer"
        onClick={() => {
          window.location.reload();
        }}
      />
    </div>
  );
};

export default UpdateButton;
