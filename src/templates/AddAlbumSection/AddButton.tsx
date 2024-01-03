"use client";

import { useRouter } from "next/navigation";

const AddButton = () => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const res = await fetch("api/createAlbum");
      router.push("/album");
    } catch (e) {}
  };
  return <button onClick={handleClick}>만들기</button>;
};

export default AddButton;
