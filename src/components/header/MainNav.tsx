import Link from "next/link";
import SignOutButton from "../SignOutButton";

const MainNav = () => {
  return (
    <nav className="flex h-[80px] w-inner items-center">
      <Link href="/" className="flex-grow">
        조각보
      </Link>
      <SignOutButton />
    </nav>
  );
};

export default MainNav;
