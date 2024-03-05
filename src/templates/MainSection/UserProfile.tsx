import Image from "next/image";
import { Trapezoid } from "@/components/Trapezoid";
import type { UserType } from "@/types";
import MateBox from "./MateBox";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface UserProfileProps {
  user: UserType;
}

const UserProfile = async ({ user }: UserProfileProps) => {
  const { info } = await getServerSession(authOptions);

  return (
    <div>
      <div className="w-[180px]">
        <div className="mb-[20px]">
          <Trapezoid
            styles={{
              width: "180px",
              height: "180px",
              clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
              bgColor: "white",
              position: "relative",
            }}
          >
            {user.profileImageUrl && (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_URL}${info.socialId}/${user.profileImageUrl}`}
                alt="thumbnail"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            )}
          </Trapezoid>
        </div>
        <p className="text-[24px] font-semibold mb-[16px]">{user.nickname}</p>
        <div className="mb-[16px]">
          <div className="flex h-[20px] mb-[18px] items-center">
            <div className="[clipPath:polygon(0%_0%,70%_0%,100%_100%,0%_100%)] bg-white w-[10px] h-[20px] mr-[8px]" />
            <p className="grow">친구</p>
            <p>{user.friends.length}</p>
          </div>
          <div className="flex mb-[18px] items-center">
            <div className="[clipPath:polygon(0%_0%,70%_0%,100%_100%,0%_100%)] bg-white w-[10px] h-[20px] mr-[8px]" />
            <p className="grow">조각</p>
            <p>{0}</p>
          </div>
          <div className="flex items-center">
            <div className="[clipPath:polygon(0%_0%,70%_0%,100%_100%,0%_100%)] bg-white w-[10px] h-[20px] mr-[8px]" />
            <p className="grow">조각보</p>
            <p>{user.albums.length + user.collaboAlbums.length}</p>
          </div>
        </div>
        <Link href="/my/profile" className="text-[14px]">
          내 정보 관리
        </Link>
        <MateBox mateList={user.friends} />
      </div>
    </div>
  );
};

export default UserProfile;
