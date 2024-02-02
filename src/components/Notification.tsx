"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useMouseDownOutside from "@/hooks/useMouseDownOutside";
import usePushNotification from "@/hooks/usePushNotification";
import type { FriendsType } from "@/types";
import NotiIcon from "../../public/images/svg/noti.svg";
import { mockNotiList } from "@/assets/mockData";
import { Trapezoid, TrapeButton } from "./Trapezoid";

interface PushNotiPropsType {
  info: FriendsType | any;
  handleResponse: (r: string, u: string, n: string) => void;
  setIsAppear?: any;
  handleFilterPushMsg: (u: string) => void;
  index?: any;
}

const notiIndexBoxColor = ["#7aacf7", "#ff9898", "#59b86e", "#ffe380"];

const PushNoti = ({
  index,
  info,
  handleResponse,
  setIsAppear,
  handleFilterPushMsg,
}: PushNotiPropsType) => {
  return (
    <div>
      <div className="flex items-start pl-[8px]">
        <div className="pt-[7px] mr-[14px]">
          <Trapezoid
            styles={{
              width: "8px",
              height: "8px",
              clipPath: "polygon(0 0, 87.5% 0%, 100% 100%, 0% 100%)",
              position: "relative",
              bgColor: `${notiIndexBoxColor[index % 4]}`,
            }}
          />
        </div>
        <p className="mb-[6px] break-keep">
          {info?.nickname}님이 친구 요청을 보냈습니다.
        </p>
      </div>
      <div>
        <button
          onClick={() => {
            handleResponse("accept", info.socialID, info.nickname);
            handleFilterPushMsg(info.socialID);
            setIsAppear(false);
          }}
          className="underline ml-[30px] mr-[15px] text-[14px]"
        >
          수락
        </button>
        <button
          onClick={() => {
            handleResponse("reject", info.socialID, info.nickname);
            handleFilterPushMsg(info.socialID);
            setIsAppear(false);
          }}
          className="underline text-[14px]"
        >
          거절
        </button>
      </div>
    </div>
  );
};

const Notification = () => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useMouseDownOutside(notificationRef);
  const { pushMsg, isAppear, setIsAppear } = usePushNotification();
  const [receivedReq, setReceivedReq] = useState<FriendsType[]>([]);

  const handleResponse = async (
    responseType: string,
    userID: string,
    nickname: string
  ) => {
    const res = await fetch("/api/replyMate", {
      method: "POST",
      body: JSON.stringify({
        userID,
        responseType,
      }),
    });

    if (!res.ok) {
      alert("잠시 후 다시 시도해주세요.");
      return;
    }

    if (responseType === "reject") alert("거절하셨습니다.");
    if (responseType === "accept") alert(`${nickname}님과 친구가 되었습니다.`);
  };
  const handleFilterPushMsg = (userID: string) => {
    const filteredReceivedReq = receivedReq.filter((item) => {
      return item.socialID !== userID;
    });
    setReceivedReq(filteredReceivedReq);
  };

  useEffect(() => {
    const getReceivedReq = async () => {
      const res = await fetch(`/api/profile`);
      const data = await res.json();
      setReceivedReq(data.receivedFriendRequest);
    };
    getReceivedReq();

    if (pushMsg) {
      setReceivedReq((prev: any) => {
        return [...prev, pushMsg];
      });
    }
  }, [pushMsg]);

  return (
    <section ref={notificationRef} className="relative">
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image src={NotiIcon} alt="알림" />
      </div>
      {isOpen && (
        <div
          className="absolute top-[42px] left-[-336px] w-[360px] h-[600px] border-[1px] border-white 
          bg-main_black px-[30px] pt-[23px]"
        >
          <div className="flex gap-[6px] mb-[32px]">
            <Image src={NotiIcon} alt="알림" />
            <p className="text-[20px] font-semibold">알림 목록</p>
          </div>
          <div className="h-[430px] mb-[28px] flex flex-col gap-[20px] overflow-scroll">
            {!!mockNotiList.length ? (
              mockNotiList.map((item, index) => (
                <PushNoti
                  key={index}
                  index={index}
                  info={item}
                  handleResponse={handleResponse}
                  setIsAppear={setIsAppear}
                  handleFilterPushMsg={handleFilterPushMsg}
                />
              ))
            ) : (
              <p>새로운 알림이 없습니다.</p>
            )}
          </div>
          <TrapeButton
            styles="mx-auto"
            handleClick={() => {
              setIsOpen(false);
            }}
          >
            닫기
          </TrapeButton>
        </div>
      )}
      {isAppear && (
        <div className="fixed top-[50px] left-[300px] bg-main_black z-30">
          <PushNoti
            info={pushMsg}
            handleResponse={handleResponse}
            setIsAppear={setIsAppear}
            handleFilterPushMsg={handleFilterPushMsg}
          />
        </div>
      )}
    </section>
  );
};

export default Notification;
