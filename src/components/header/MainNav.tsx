import Link from "next/link";
import SignOutButton from "../button/SignOutButton";

const MainNav = () => {
  return (
    <nav className="flex h-header w-inner items-center">
      <Link href="/" className="flex-grow">
        조각보
      </Link>
      <Link href="/protected" className="pr-10">
        둘러보기
      </Link>
      <SignOutButton />
    </nav>
  );
};

export default MainNav;
