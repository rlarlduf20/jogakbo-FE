"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useMouseDownOutside from "@/hooks/useMouseDownOutside";
import usePushNotification from "@/hooks/usePushNotification";
import type { FriendsType } from "@/types";
import NotiIcon from "../../public/images/svg/noti.svg";

interface PushNotiPropsType {
  info: FriendsType | any;
  handleResponse: (r: string, u: string, n: string) => void;
  setIsAppear?: any;
  handleFilterPushMsg: (u: string) => void;
}

const PushNoti = ({
  info,
  handleResponse,
  setIsAppear,
  handleFilterPushMsg,
}: PushNotiPropsType) => {
  return (
    <div className="p-2 border-b-2 border-white">
      <p className="pb-3">{info?.nickname}님이 친구 요청을 보냈습니다.</p>
      <div>
        <button
          onClick={() => {
            handleResponse("reject", info.socialID, info.nickname);
            handleFilterPushMsg(info.socialID);
            setIsAppear(false);
          }}
          className="border-[1px] border-white px-3 py-1"
        >
          거절
        </button>
        <button
          onClick={() => {
            handleResponse("accept", info.socialID, info.nickname);
            handleFilterPushMsg(info.socialID);
            setIsAppear(false);
          }}
          className="bg-white border-[1px]  text-main_black px-3 py-1"
        >
          수락
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
        <div className="absolute w-[200px] h-[400px] border-[1px] border-white bg-main_black">
          {receivedReq.map((item, index) => (
            <PushNoti
              key={index}
              info={item}
              handleResponse={handleResponse}
              setIsAppear={setIsAppear}
              handleFilterPushMsg={handleFilterPushMsg}
            />
          ))}
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
