import Link from "next/link";
import SignButton from "../SignButton";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 w-full flex justify-center">
      <nav className="flex h-[80px] w-inner items-center">
        <div className="grow">
          <Link href="/" className="text-[18px]">
            당신의 추억을 모아
          </Link>
        </div>
        <SignButton />
      </nav>
    </header>
  );
};

export default LandingHeader;
