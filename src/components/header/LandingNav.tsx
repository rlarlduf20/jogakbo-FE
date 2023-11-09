import Link from "next/link";
import SignButton from "../button/SignButton";

const LandingNav = () => {
  return (
    <nav className="flex h-header w-inner items-center">
      <Link href="/" className="flex-grow">
        조각보
      </Link>
      <SignButton />
    </nav>
  );
};

export default LandingNav;
