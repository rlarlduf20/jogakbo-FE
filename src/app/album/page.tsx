"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const albumMockDataList = [
  {
    page: 1,
    imgList: [
      { src: "/images/lion.png", locationX: 30, locationY: 50 },
      { src: "/images/kakao_login_btn.png", locationX: 90, locationY: 80 },
    ],
  },
  {
    page: 2,
    imgList: [{ src: "/images/rabbit.png", locationX: 100, locationY: 70 }],
  },
  {
    page: 3,
    imgList: [{ src: "/images/smileBall.png", locationX: 10, locationY: 10 }],
  },
  { page: 4, imgList: [{ src: "", locationX: 40, locationY: 40 }] },
];

const AlbumCreatePage = () => {
  const canvasLeftRef = useRef<any>();
  const canvasRightRef = useRef<any>();
  const [page, setPage] = useState(1);
  const [isDrag, setIsDrag] = useState(false);
  const handleDrop = useCallback((event: any) => {
    event.preventDefault();
    setIsDrag(false);
    const files = event.dataTransfer.files;
    console.log(files);
  }, []);
  const handleDragOver = useCallback((event: any) => {
    event.preventDefault();
    setIsDrag(true);
  }, []);

  useEffect(() => {
    const renderCanvas = (canvasRef: any, currentPage: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log(currentPage);
      const currentPageData = albumMockDataList.find(
        (data) => data.page === currentPage
      );

      if (currentPageData) {
        currentPageData.imgList.forEach(({ src, locationX, locationY }) => {
          if (src) {
            const image = new Image();
            image.src = src;
            image.onload = () => {
              ctx.drawImage(image, locationX, locationY);
            };
          }
        });
      }
    };

    renderCanvas(canvasLeftRef, page);
    renderCanvas(canvasRightRef, page + 1);
  }, [page]);

  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section>
      <div className="w-[1200px] flex">
        <button
          className={`${page !== 1 && "hover:cursor-pointer"}`}
          disabled={page === 1}
          onClick={onClickPrev}
        >
          이전
        </button>
        <input className="border-2 block m-auto" />
        {page === albumMockDataList.length - 1 ? (
          <button className="hover:cursor-pointer" onClick={onClickNext}>
            생성
          </button>
        ) : (
          <button className="hover:cursor-pointer" onClick={onClickNext}>
            다음
          </button>
        )}
      </div>

      <div className="flex gap-[40px]">
        <canvas
          ref={canvasLeftRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => {
            setIsDrag(false);
          }}
          className={`${isDrag ? "border-4" : "border-2"} w-[580px] h-[600px]`}
        ></canvas>
        <canvas
          ref={canvasRightRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => {
            setIsDrag(false);
          }}
          className={`${isDrag ? "border-4" : "border-2"} w-[580px] h-[600px]`}
        ></canvas>
      </div>
    </section>
  );
};

export default AlbumCreatePage;

// import { useState, useEffect, useRef } from "react";
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";
// import { useSession } from "next-auth/react";

// const [msgList, setMsgList] = useState([]);
// const [msg, setMsg] = useState("");
// const client = useRef<any>({});
// const { data: session } = useSession();
// useEffect(() => {
//   let accessToken = session?.jogakTokens.accessToken;
//   client.current = new Client({
//     brokerURL: `ws://${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/album-ws`,
//     connectHeaders: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//     onConnect: () => {
//       console.log("연결 성공");
//       client.current.subscribe("/topic/sub", (body: any) => {
//         const json_body = JSON.parse(body.body);
//         setMsgList((_msg_list): any => [..._msg_list, json_body]);
//       });
//     },
//   });
//   client.current.activate();
//   return () => {
//     console.log("연결 해제");
//     client.current.deactivate();
//   };
// }, [session]);
// const publish = (msg: string) => {
//   if (!client.current.connected) return;

//   client.current.publish({
//     destination: "/app/img",
//     body: msg,
//   });
//   setMsg("");
// };
// const sendMsg = () => {
//   publish(msg);
// };
// return (
//   <>
//     <input
//       value={msg}
//       placeholder="제목을 입력하세요"
//       onChange={(e) => setMsg(e.target.value)}
//     />
//     <button onClick={sendMsg}>전송</button>
//     <div>
//       {msgList.map((item, index) => (
//         <p key={index}>{item}</p>
//       ))}
//     </div>
//   </>
// );
