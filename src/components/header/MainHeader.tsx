import Image from "next/image";
import LogoText from "./LogoText";
import NavLink from "./NavLink";
import HomeLogoIcon from "../../../public/images/svg/home-logo.svg";
import Notification from "../Notification";

const MainHeader = () => {
  return (
    <header className="w-full flex justify-center">
      <nav className="flex h-[80px] w-inner items-center">
        <Image src={HomeLogoIcon} alt="홈 로고 아이콘" />
        <LogoText />
        <div className="mr-[30px]">
          <NavLink />
        </div>
        <Notification />
      </nav>
    </header>
  );
};

export default MainHeader;
