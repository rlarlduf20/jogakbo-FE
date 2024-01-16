"use client";

import useMouseDownOutside from "@/hooks/useMouseDownOutside";
import { useEffect, useRef } from "react";

const Notification = () => {
  const notificationRef = useRef<any>();
  const { isOpen, setIsOpen } = useMouseDownOutside(notificationRef);
  useEffect(() => {
    console.log("connect");
    return () => {
      console.log("decon");
    };
  }, []);
  return (
    <section ref={notificationRef} className="relative">
      <div
        className="border-[1px] border-white p-3 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        알림
      </div>
      {isOpen && (
        <div className="absolute w-[200px] h-[400px] border-[1px] border-white"></div>
      )}
    </section>
  );
};

export default Notification;
