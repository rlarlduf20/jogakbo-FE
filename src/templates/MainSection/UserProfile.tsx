import Trapezoid from "@/components/Trapezoid";
import SignOutButton from "@/components/SignOutButton";
import type { UserType } from "@/types";

interface UserProfileProps {
  user: UserType;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div>
      <div className="w-[180px]">
        <div className="mb-[20px]">
          <Trapezoid
            styles={{
              width: "180px",
              height: "180px",
              clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
            }}
          />
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
            <p className="grow">조각보</p>
            <p>{0}</p>
          </div>
          <div className="flex items-center">
            <div className="[clipPath:polygon(0%_0%,70%_0%,100%_100%,0%_100%)] bg-white w-[10px] h-[20px] mr-[8px]" />
            <p className="grow">조각</p>
            <p>{user.albums.length}</p>
          </div>
        </div>
        <div className="text-[14px]">회원정보 수정</div>
        <SignOutButton />
      </div>
    </div>
  );
};

export default UserProfile;
