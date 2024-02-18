"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useMouseDownOutside from "@/hooks/useMouseDownOutside";
import usePushNotification from "@/hooks/usePushNotification";
import type { FriendsType } from "@/types";
import NotiIcon from "../../public/images/svg/noti.svg";
import { Trapezoid, TrapeButton } from "./Trapezoid";
import useHoverText from "@/hooks/useHoverText";
import HoverText from "./HoverText";

interface PushNotiPropsType {
  info: FriendsType | any;
  handleResponse: (r: string, u: string, n: string) => void;
  setIsAppear?: any;
  handleFilterPushMsg: (u: string) => void;
  type?: string;
}

const PushNoti = ({
  info,
  handleResponse,
  setIsAppear,
  handleFilterPushMsg,
  type,
}: PushNotiPropsType) => {
  return (
    <div>
      <div className={`flex items-start ${type === "push" || "pl-[8px]"}`}>
        <div className={`${type === "push" || "pt-[7px]"} mr-[13px]`}>
          {type === "push" ? (
            <Image src={NotiIcon} alt="알림" />
          ) : (
            <Trapezoid
              styles={{
                width: "8px",
                height: "8px",
                clipPath: "polygon(0 0, 87.5% 0%, 100% 100%, 0% 100%)",
                position: "relative",
                bgColor: "#7aacf7",
              }}
            />
          )}
        </div>
        <p className="mb-[6px] break-keep">
          {info?.nickname}님이 친구 요청을 보냈습니다.
        </p>
      </div>
      <div className={`${type === "push" ? "ml-[38px]" : "ml-[30px]"}`}>
        <button
          onClick={() => {
            handleResponse("accept", info.socialID, info.nickname);
            handleFilterPushMsg(info.socialID);
            setIsAppear(false);
          }}
          className="underline mr-[15px] text-[14px]"
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
  const { isHoverIcon, handleIsHoverToFalse, handleIsHoverToTrue } =
    useHoverText();

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
        className="relative cursor-pointer whitespace-nowrap"
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseOver={handleIsHoverToTrue}
        onMouseLeave={handleIsHoverToFalse}
      >
        <Image src={NotiIcon} alt="알림" />
        {isHoverIcon && <HoverText>알림</HoverText>}
        {receivedReq.length === 0 || (
          <p className="absolute top-[50%] left-[50%] ml-[-3.42px] mt-[-8px] font-semibold text-[12px] text-main_black">
            {receivedReq.length}
          </p>
        )}
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
            {!!receivedReq.length ? (
              receivedReq.map((item, index) => (
                <PushNoti
                  key={index}
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
            type="outline"
            handleClick={() => {
              setIsOpen(false);
            }}
          >
            닫기
          </TrapeButton>
        </div>
      )}
      <div
        className={`fixed top-[70px] right-[-20%] bg-main_black z-30 
          border-[1px] border-white py-[23px] px-[30px] w-[360px]
         transition-all duration-700  
         ${isAppear || "opacity-0"}
          ${isAppear ? "right-[calc(50vw-600px)]" : "right-[-20%]"}
          `}
      >
        <PushNoti
          type="push"
          info={pushMsg}
          handleResponse={handleResponse}
          setIsAppear={setIsAppear}
          handleFilterPushMsg={handleFilterPushMsg}
        />
      </div>
    </section>
  );
};

export default Notification;
