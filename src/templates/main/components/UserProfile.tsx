import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Trapezoid from "@/components/shape/Trapezoid";
import { getServerSession } from "next-auth";

const UserProfile = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div className="w-[180px]">
        <Trapezoid
          styles={{
            width: "180px",
            height: "180px",
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
          }}
        />
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
      </div>
    </div>
  );
};

export default UserProfile;
