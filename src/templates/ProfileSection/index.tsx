import SignOutButton from "@/components/SignOutButton";
import Trapezoid from "@/components/Trapezoid";
import Link from "next/link";
import EditBox from "./EditBox";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ProfileSection = async () => {
  const { info } = await getServerSession(authOptions);
  return (
    <section className="pt-[20px] pb-[100px] w-full flex flex-col items-center gap-[80px]">
      <EditBox />
      <div className="w-[200px] flex flex-col gap-[20px]">
        <div className="flex items-center">
          <p className="grow text-[18px] font-bold">로그인 정보</p>
          <p>{info.provider === "kakao" ? "카카오 로그인" : "네이버 로그인"}</p>
        </div>
        <div className="flex items-center mb-[20px]">
          <p className="grow text-[18px] font-bold">고유 번호</p>
          <p>{"#" + info.socialId.slice(0, 6)}</p>
        </div>
        <SignOutButton />
        <button className="text-[14px] underline mb-[30px]">탈퇴</button>
        <Link href="/my" className="mx-auto">
          <Trapezoid
            styles={{
              width: "78px",
              height: "32px",
              clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0% 100%)",
              bgColor: "white",
            }}
          >
            <p className="text-main_black text-center pt-[5.5px]">닫기</p>
          </Trapezoid>
        </Link>
      </div>
    </section>
  );
};

export default ProfileSection;
