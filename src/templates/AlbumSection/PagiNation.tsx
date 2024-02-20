import { useState } from "react";
import Image from "next/image";
import PrevIcon from "../../../public/images/svg/prev.svg";
import PrevDisabledIcon from "../../../public/images/svg/prev_disabled.svg";
import NextIcon from "../../../public/images/svg/next.svg";
import NextDisabledIcon from "../../../public/images/svg/next_disabled.svg";
import PlusIcon from "../../../public/images/svg/plus.svg";

interface PagiNationPropsType {
  page: number;
  movePrevPage: () => void;
  moveNextPage: (isCreate: boolean) => void;
  albumSize: number;
}

const PagiNation = ({
  page,
  movePrevPage,
  moveNextPage,
  albumSize,
}: PagiNationPropsType) => {
  const [isHoverPlusBtn, setIsHoverPlusBtn] = useState<boolean>(false);
  return (
    <div className="relative w-[180px] mt-[17px] mx-auto">
      <button
        disabled={page <= 0}
        onClick={movePrevPage}
        className="absolute left-0"
      >
        <Image src={page <= 0 ? PrevDisabledIcon : PrevIcon} alt="이전" />
      </button>
      <p className="absolute w-[65px] left-[50%] translate-x-[-50%] text-white">
        <span className="absolute left-0">{page + 1}</span>
        <span className="absolute left-[50%] translate-x-[-50%]">/</span>
        <span className="absolute right-0">{albumSize}</span>
      </p>
      <button
        onMouseOver={() => setIsHoverPlusBtn(true)}
        onMouseLeave={() => setIsHoverPlusBtn(false)}
        onClick={() => moveNextPage(page + 1 === albumSize)}
        className="absolute right-0"
      >
        <Image
          src={page + 1 === albumSize ? NextDisabledIcon : NextIcon}
          alt="다음"
        />
      </button>
      {page + 1 === albumSize && isHoverPlusBtn && (
        <Image
          src={PlusIcon}
          alt="추가"
          width={10}
          height={10}
          className="absolute top-[6px] right-[-15px]"
        />
      )}
    </div>
  );
};

export default PagiNation;
