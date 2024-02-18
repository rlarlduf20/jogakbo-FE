import { useState } from "react";

const useHoverText = () => {
  const [isHoverIcon, setIsHoverIcon] = useState<boolean>(false);

  const handleIsHoverToFalse = () => {
    setIsHoverIcon(false);
  };
  const handleIsHoverToTrue = () => {
    setIsHoverIcon(true);
  };

  return { isHoverIcon, handleIsHoverToFalse, handleIsHoverToTrue };
};

export default useHoverText;
