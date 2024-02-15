"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { TrapeButton } from "@/components/Trapezoid";

interface RouteButtonsPropsType {
  albumID: string;
}

const RouteButtons = ({ albumID }: RouteButtonsPropsType) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="flex gap-[30px] w-full justify-center">
      <TrapeButton type="outline" handleClick={handleBack}>
        닫기
      </TrapeButton>
      <Link href={`/album/${albumID}`}>
        <TrapeButton>들어가기</TrapeButton>
      </Link>
    </div>
  );
};

export default RouteButtons;
