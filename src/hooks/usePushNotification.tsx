import { useState, useEffect } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useSession } from "next-auth/react";
import { FriendsType } from "@/types";

const usePushNotification = () => {
  const { data: session } = useSession();
  const [isAppear, setIsAppear] = useState<boolean>(false);
  const [pushMsg, setPushMsg] = useState<FriendsType>();

  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;

    let eventSource: any;
    if (session?.jogakTokens.accessToken) {
      eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/sse`,
        {
          headers: {
            Authorization: `Bearer ${session?.jogakTokens.accessToken}`,
            Connetction: "keep-alive",
            Accept: "text/event-stream",
          },
          heartbeatTimeout: 86400000,
        }
      );
    }
    let timer: any;
    eventSource?.addEventListener("friendRequest", (e: any) => {
      setIsAppear(true);
      const data = JSON.parse(e.data);
      timer = setTimeout(() => {
        setIsAppear(false);
      }, 5000);

      setPushMsg({ ...data, type: "friend" });
    });
    eventSource?.addEventListener("albumInvitation", (e: any) => {
      setIsAppear(true);
      const data = JSON.parse(e.data);
      // timer = setTimeout(() => {
      //   setIsAppear(false);
      // }, 5000);

      setPushMsg({ ...data, type: "album" });
    });
    return () => {
      eventSource?.close();
      clearTimeout(timer);
    };
  }, [session?.jogakTokens.accessToken]);

  return { pushMsg, isAppear, setIsAppear };
};

export default usePushNotification;
