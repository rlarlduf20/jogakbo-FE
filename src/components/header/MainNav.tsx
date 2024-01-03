import Image from "next/image";
import LogoText from "./LogoText";
import NavLink from "./NavLink";

const MainNav = () => {
  return (
    <nav className="flex h-[80px] w-inner items-center">
      <Image
        src="/images/logo/temporary-logo-main.png"
        alt="logo"
        width={41.67}
        height={41.67}
      />
      <LogoText />
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
        <NavLink />
      </div>
    </nav>
  );
};

export default MainNav;
