import Link from "next/link";
import SignButton from "../SignButton";

const LandingNav = () => {
  return (
    <nav className="flex h-[80px] w-inner items-center">
      <Link href="/" className="flex-grow">
        조각보
      </Link>
      <SignButton />
    </nav>
  );
};

export default LandingNav;
