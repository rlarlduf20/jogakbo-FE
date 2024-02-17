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

  const handleDelete = async () => {
    const res = await fetch("/api/albumInfo", {
      method: "DELETE",
      body: JSON.stringify({ albumID }),
    });
    if (!res.ok) {
      alert("다시 시도해주세요.");
      return;
    }
    alert("앨범이 삭제되었습니다.");
  };
  return (
    <div className="flex gap-[30px] w-full justify-center">
      <TrapeButton type="outline" handleClick={handleBack}>
        닫기
      </TrapeButton>
      <Link href={`/album/${albumID}`}>
        <TrapeButton>들어가기</TrapeButton>
      </Link>
      <button onClick={handleDelete}>삭제하기</button>
    </div>
  );
};

export default RouteButtons;
