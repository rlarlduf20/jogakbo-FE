import { useEffect, useState } from "react";

const useScrollY = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      console.log(window.scrollY);
      setScrollY(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", (e) => {
        setScrollY(window.scrollY);
      });
    };
  }, []);

  return { scrollY };
};

export default useScrollY;
