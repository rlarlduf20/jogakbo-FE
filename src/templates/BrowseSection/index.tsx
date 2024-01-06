import Image from "next/image";
import Link from "next/link";
import ExclamationMarkIcon from "../../../public/images/svg/exclamation-mark.svg";
import RouteTrapezoidIcon from "../../../public/images/svg/route-trapezoid.svg";

const mockFriends = [];

const NoFriend = () => {
  return (
    <section className="flex flex-col h-[calc(100vh-80px)] justify-center items-center">
      <Image src={ExclamationMarkIcon} alt="느낌표 아이콘" />
      <p className="text-[20px] mt-[22px] mb-[51px] text-center">
        앗 둘러볼 친구가 없어요!
        <br />
        친구를 추가해주세요.
      </p>
      <div className="flex gap-[3px]">
        <Image src={RouteTrapezoidIcon} alt="사다리꼴 아이콘" />
        <Link href="/">내 조각보</Link>
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
