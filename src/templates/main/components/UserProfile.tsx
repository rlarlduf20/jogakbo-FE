import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const UserProfile = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div className="w-[180px]">
        <div className="h-[180px] bg-gray-300 mb-6"></div>
        <div className="text-2xl font-semibold mb-3">{session?.user?.name}</div>
        <div className="mb-14">
          <div className="flex mb-1">
            <p className="grow">팔로우</p>
            <p>{200}</p>
          </div>
          <div className="flex">
            <p className="grow">팔로워</p>
            <p>{200}</p>
          </div>
        </div>
        <div>회원가입 수정</div>
      </div>
    </div>
  );
};

export default UserProfile;
