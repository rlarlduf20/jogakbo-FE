import LogoText from "./LogoText";
import NavLink from "./NavLink";

const MainNav = () => {
  return (
    <nav className="flex h-[80px] w-inner items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
      >
        <g clipPath="url(#clip0_325_261)">
          <path
            d="M16.8417 25.1584L25.075 25.9834L27.6583 0.166748H14.3417L16.8417 25.1584Z"
            fill="#FFE381"
          />
          <path
            d="M12.6666 0.166748H0.166626V23.4917L15.15 24.9918L12.6666 0.166748Z"
            fill="#59B86E"
          />
          <path
            d="M0.166626 25.1667V41.8334H23.4916L24.5666 31.0917L24.65 30.2584L24.7333 29.4251L24.9083 27.6417L0.166626 25.1667Z"
            fill="#FF9898"
          />
          <path
            d="M29.3333 0.166748L25.1666 41.8334H41.8333V0.166748H29.3333Z"
            fill="#7AACF7"
          />
        </g>
        <defs>
          <clipPath id="clip0_325_261">
            <rect
              width="41.6667"
              height="41.6667"
              fill="white"
              transform="translate(0.166626 0.166748)"
            />
          </clipPath>
        </defs>
      </svg>
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
