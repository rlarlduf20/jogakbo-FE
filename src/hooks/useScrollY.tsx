import { useEffect, useState } from "react";

const useScrollY = (ref: any) => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScrollMove = () => {
      let elYPos = window.scrollY + ref?.current?.getBoundingClientRect().top;
      setScrollY(elYPos);
    };
    window.addEventListener("scroll", handleScrollMove);
    return () => {
      window.removeEventListener("scroll", handleScrollMove);
    };
  }, [ref]);

  return { scrollY };
};

export default useScrollY;
