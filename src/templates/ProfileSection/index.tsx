import SignOutButton from "@/components/SignOutButton";
import { TrapeButton } from "@/components/Trapezoid";
import Link from "next/link";
import EditBox from "./EditBox";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUser } from "@/lib/user/getUser";

const ProfileSection = async () => {
  const { info } = await getServerSession(authOptions);
  const { nickname, profileImageUrl } = await getUser();
  return (
    <section className="pt-[20px] pb-[100px] w-full flex flex-col items-center gap-[80px]">
      <EditBox
        nickname={nickname}
        profileImageUrl={profileImageUrl}
        socialId={info.socialId}
      />
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
          <TrapeButton type="outline">닫기</TrapeButton>
        </Link>
      </div>
    </section>
  );
};

export default ProfileSection;
