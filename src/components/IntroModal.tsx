"use client";

import { useState } from "react";

interface IntroModalProps {
  role: string;
}

const IntroModal = ({ role }: IntroModalProps) => {
  const [isBeginner, setIsBeginner] = useState(role === "beginner");

  if (!isBeginner) {
    return null;
  }
  return (
    <section className="absolute z-40 top-[-80px] left-0 w-full h-[500px] bg-main_yellow"></section>
  );
};

export default IntroModal;
