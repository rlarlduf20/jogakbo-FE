import { useState, useEffect } from "react";

const useMouseDownOutside = (ref: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const outsideMouseDown = (e: any) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", outsideMouseDown);
    console.log(isOpen);
    return () => {
      document.removeEventListener("mousedown", outsideMouseDown);
    };
  }, [isOpen, ref]);

  return { isOpen, setIsOpen };
};

export default useMouseDownOutside;
