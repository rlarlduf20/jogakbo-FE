"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useMouseDownOutside from "@/hooks/useMouseDownOutside";
import usePushNotification from "@/hooks/usePushNotification";
import { type AlbumsType, type FriendsType } from "@/types";
import NotiIcon from "../../public/images/svg/noti.svg";
import { Trapezoid, TrapeButton } from "./Trapezoid";
import useHoverText from "@/hooks/useHoverText";
import HoverText from "./HoverText";

interface PushNotiPropsType {
  info: FriendsType | any;
  handleResponse: (r: string, u: string, n: string) => void;
  handleResponseAlbumInvite: (r: string, a: string) => void;
  setIsAppear?: any;
  handleFilterPushMsg: (u: string) => void;
  handleFilterAlbumInvite: (a: string) => void;
  type?: string;
}

const PushNoti = ({
  info,
  handleResponse,
  handleResponseAlbumInvite,
  setIsAppear,
  handleFilterPushMsg,
  handleFilterAlbumInvite,
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
                bgColor: info.type === "friend" ? "#ff9898" : "#7aacf7",
              }}
            />
          )}
        </div>
        <p className="mb-[6px] break-keep">
          {info?.type === "friend"
            ? `${info?.nickname}님이 친구 요청을 보냈습니다.`
            : `${info?.albumName} 앨범에서 초대를 요청했습니다.`}
        </p>
      </div>
      <div className={`${type === "push" ? "ml-[38px]" : "ml-[30px]"}`}>
        {info?.type === "friend" ? (
          <>
            <button
              onClick={() => {
                handleResponse("accept", info.userUUID, info.nickname);
                handleFilterPushMsg(info.userUUID);
                setIsAppear(false);
              }}
              className="underline mr-[15px] text-[14px]"
            >
              수락
            </button>
            <button
              onClick={() => {
                handleResponse("reject", info.userUUID, info.nickname);
                handleFilterPushMsg(info.userUUID);
                setIsAppear(false);
              }}
              className="underline text-[14px]"
            >
              거절
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                handleResponseAlbumInvite("accept", info.albumID);
                handleFilterAlbumInvite(info.albumID);
                setIsAppear(false);
              }}
              className="underline mr-[15px] text-[14px]"
            >
              수락
            </button>
            <button
              onClick={() => {
                handleResponseAlbumInvite("reject", info.albumID);
                handleFilterAlbumInvite(info.albumID);
                setIsAppear(false);
              }}
              className="underline text-[14px]"
            >
              거절
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Notification = () => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useMouseDownOutside(notificationRef);
  const { pushMsg, isAppear, setIsAppear } = usePushNotification();
  const [receivedReq, setReceivedReq] = useState<FriendsType[]>([]);
  const [receivedAlbumInvite, setReceivedAlbumInvite] = useState<AlbumsType[]>(
    []
  );
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
  const handleResponseAlbumInvite = async (
    responseType: string,
    albumID: string
  ) => {
    const res = await fetch("/api/albumInvite/reply", {
      method: "POST",
      body: JSON.stringify({
        albumID,
        responseType,
      }),
    });

    if (!res.ok) {
      alert("잠시 후 다시 시도해주세요.");
      return;
    }

    if (responseType === "reject") alert("거절하셨습니다.");
    if (responseType === "accept") alert("앨범에 초대되었습니다.");
  };
  const handleFilterPushMsg = (userID: string) => {
    const filteredReceivedReq = receivedReq.filter((item) => {
      return item.userUUID !== userID;
    });
    setReceivedReq(filteredReceivedReq);
  };
  const handleFilterAlbumInvite = (albumID: string) => {
    const filteredReceivedAlbumInvite = receivedAlbumInvite.filter((item) => {
      return item.albumID !== albumID;
    });
    setReceivedAlbumInvite(filteredReceivedAlbumInvite);
  };
  useEffect(() => {
    const getReceivedReq = async () => {
      const res = await fetch(`/api/profile`);
      const data = await res.json();
      setReceivedReq(data.receivedFriendRequest);
      setReceivedAlbumInvite(data.receivedAlbumInvitations);
    };
    getReceivedReq();

    if (pushMsg && pushMsg?.type === "friend") {
      setReceivedReq((prev: any) => {
        return [...prev, pushMsg];
      });
    }
    if (pushMsg && pushMsg?.type === "album") {
      setReceivedAlbumInvite((prev: any) => {
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
        {(receivedReq?.length === 0 && receivedAlbumInvite?.length === 0) || (
          <p className="absolute top-[50%] left-[50%] ml-[-3.42px] mt-[-8px] font-semibold text-[12px] text-main_black">
            {receivedReq.length + receivedAlbumInvite.length}
          </p>
        )}
      </div>
      {isOpen && (
        <div
          className="absolute top-[42px] left-[-336px] w-[360px] h-[600px] border-[1px] border-white 
          bg-main_black px-[30px] pt-[23px] z-999"
        >
          <div className="flex gap-[6px] mb-[32px]">
            <Image src={NotiIcon} alt="알림" />
            <p className="text-[20px] font-semibold">알림 목록</p>
          </div>
          <div className="h-[430px] mb-[28px] flex flex-col gap-[20px] overflow-scroll">
            {!!!receivedReq?.length && !!!receivedAlbumInvite?.length ? (
              <p>새로운 알림이 없습니다.</p>
            ) : (
              receivedReq.map((item, index) => (
                <PushNoti
                  key={index}
                  info={{ ...item, type: "friend" }}
                  handleResponse={handleResponse}
                  handleResponseAlbumInvite={handleResponseAlbumInvite}
                  setIsAppear={setIsAppear}
                  handleFilterPushMsg={handleFilterPushMsg}
                  handleFilterAlbumInvite={handleFilterAlbumInvite}
                />
              ))
            )}
            {!!!receivedReq?.length && !!!receivedAlbumInvite?.length ? (
              <p
                className={`${
                  !!!receivedReq?.length &&
                  !!!receivedAlbumInvite?.length &&
                  "hidden"
                }`}
              >
                새로운 알림이 없습니다.
              </p>
            ) : (
              receivedAlbumInvite?.map((item, index) => (
                <PushNoti
                  key={index}
                  info={{ ...item, type: "album" }}
                  handleResponse={handleResponse}
                  handleResponseAlbumInvite={handleResponseAlbumInvite}
                  setIsAppear={setIsAppear}
                  handleFilterPushMsg={handleFilterPushMsg}
                  handleFilterAlbumInvite={handleFilterAlbumInvite}
                />
              ))
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
          handleResponseAlbumInvite={handleResponseAlbumInvite}
          setIsAppear={setIsAppear}
          handleFilterPushMsg={handleFilterPushMsg}
          handleFilterAlbumInvite={handleFilterAlbumInvite}
        />
      </div>
    </section>
  );
};

export default Notification;
