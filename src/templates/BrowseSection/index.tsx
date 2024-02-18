import Image from "next/image";
import Link from "next/link";
import ExclamationMarkIcon from "../../../public/images/svg/exclamation-mark.svg";

const mockFriends = [];

const NoFriend = () => {
  return (
    <section className="flex flex-col h-[calc(100vh-80px)] justify-center items-center">
      <Image src={ExclamationMarkIcon} alt="느낌표 아이콘" />
      <p className="text-[20px] mt-[50px] mb-[20px] text-center">
        둘러보기는 준비중이에요!
      </p>
      <div className="flex gap-[3px]">
        <Link href="/" className="text-[14px] underline">
          내 조각보 돌아가기
        </Link>
      </div>
    </section>
  );
};

const BrowseSection = () => {
  if (mockFriends.length === 0) {
    return <NoFriend />;
  }
  return <>having</>;
};

export default BrowseSection;
