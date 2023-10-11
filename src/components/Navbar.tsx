import Link from "next/link";
import SignButton from "@/components/SignButton";
import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const session = await getServerSession();
  return (
    <>
      {session ? (
        <nav className="flex">
          <Link href="/" className="flex-grow">
            조각보
          </Link>
          <Link href="/protected" className="pr-10">
            둘러보기
          </Link>
          <SignOutButton />
        </nav>
      ) : (
        <nav className="flex">
          <Link href="/" className="flex-grow">
            조각보
          </Link>
          <SignButton />
        </nav>
      )}
    </>
  );
};

export default Navbar;
