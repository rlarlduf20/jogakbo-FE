import { useEffect, useState } from "react";

const useScrollY = () => {
  const [scrollYPos, setScrollYPos] = useState<number>(0);
  const [isScrollStart, setIsScrollStart] = useState<boolean>(false);

  useEffect(() => {
    const handleScrollMove = () => {
      setScrollYPos(window.scrollY);
    };
    window.history.scrollRestoration = "manual";
    // setScrollYPos(window.scrollY);
    setIsScrollStart(true);
    window.addEventListener("scroll", handleScrollMove);
    return () => {
      window.removeEventListener("scroll", handleScrollMove);
    };
  }, []);

  return { scrollYPos, isScrollStart };
};

export default useScrollY;
