import Image from "next/image";
import LogoText from "./LogoText";
import NavLink from "./NavLink";
import HomeLogoIcon from "../../../public/images/svg/home-logo.svg";
import RouteTrapezoidIcon from "../../../public/images/svg/route-trapezoid.svg";

const MainNav = () => {
  return (
    <nav className="flex h-[80px] w-inner items-center">
      <Image src={HomeLogoIcon} alt="홈 로고 아이콘" />
      <LogoText />
      <Image src={RouteTrapezoidIcon} alt="사다리꼴 아이콘" />
      <div className="ml-[3px] flex gap-[3px]">
        <NavLink />
      </div>
    </nav>
  );
};

export default MainNav;
