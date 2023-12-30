import Trapezoid from "@/components/shape/Trapezoid";
import { userInfo } from "@/templates/album/assets/mockData";

const UserProfile = () => {
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
        <p className="text-[24px] font-semibold mb-[16px]">{userInfo.name}</p>
        <div className="mb-[16px]">
          <div className="flex h-[20px] mb-[18px] items-center font-medium">
            <div className="[clip-path:polygon(0%_0%,70%_0%,100%_100%,0%_100%)] bg-black w-[10px] h-[20px] mr-[8px]" />
            <p className="grow">친구</p>
            <p>{userInfo.mateNum}</p>
          </div>
          <div className="flex mb-[18px] items-center font-medium">
            <div className="[clip-path:polygon(0%_0%,70%_0%,100%_100%,0%_100%)] bg-black w-[10px] h-[20px] mr-[8px]" />
            <p className="grow">조각보</p>
            <p>{userInfo.jogakboNum}</p>
          </div>
          <div className="flex items-center font-medium">
            <div className="[clip-path:polygon(0%_0%,70%_0%,100%_100%,0%_100%)] bg-black w-[10px] h-[20px] mr-[8px]" />
            <p className="grow">조각</p>
            <p>{userInfo.jogakNum}</p>
          </div>
        </div>
        <div className="text-[14px] font-medium">회원정보 수정</div>
      </div>
    </div>
  );
};

export default UserProfile;
