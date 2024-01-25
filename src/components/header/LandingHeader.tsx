import Link from "next/link";
import SignButton from "../SignButton";

const LandingHeader = () => {
  return (
    <header className="w-full flex justify-center">
      <nav className="flex h-[80px] w-inner items-center">
        <Link href="/" className="flex-grow">
          조각보
        </Link>
        <SignButton />
      </nav>
    </header>
  );
};

export default LandingHeader;
