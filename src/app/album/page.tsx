import AlbumSection from "@/templates/album";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AlbumPage = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return <AlbumSection />;
};

export default AlbumPage;

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
