import Image from "next/image";
import Link from "next/link";

const mockFriends = [];

const NoFriend = () => {
  return (
    <section className="flex flex-col h-[calc(100vh-80px)] justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="57"
        viewBox="0 0 16 57"
        fill="none"
      >
        <path
          d="M12 40L16 0L-3.17786e-07 -1.39876e-06L-3.8147e-06 40L12 40Z"
          fill="#7AACF7"
        />
        <path
          d="M12.75 44L14 57L1.82822e-07 57L-9.53674e-07 44L12.75 44Z"
          fill="#FFE381"
        />
      </svg>
      <p className="text-[20px] mt-[22px] mb-[51px] text-center">
        앗 둘러볼 친구가 없어요!
        <br />
        친구를 추가해주세요.
      </p>
      <div className="flex gap-[3px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="24"
          viewBox="0 0 10 24"
          fill="none"
        >
          <path d="M0 0V24H10L7 0H0Z" fill="white" />
        </svg>
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
