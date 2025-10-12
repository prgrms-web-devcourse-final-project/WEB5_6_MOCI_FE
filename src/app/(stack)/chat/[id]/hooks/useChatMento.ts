import { APIerror, getChatMsgMento } from "@/api/getChatMsgMento";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/api/constants/config";

export type Message = {
  id: number;
  sender: string;
  content: string;
  createdAt: string;
};

export default function useChatMento() {
  const [connectionStatus, setConnectionStatus] = useState("연결되지않음");
  const [messages, setMessages] = useState<Message[]>([]);
  const clientRef = useRef<Client | null>(null);
  const router = useRouter();

  const connect = useCallback(async (roomId: string) => {
    setConnectionStatus("연결중 . . . ");
    const client = new Client({
      // 웹 소켓 연결을 위한 팩토리 함수(커스텀 웹소켓 : SockJS 같은거 사용하고싶으면 지정함)
      webSocketFactory: () => new SockJS(`${BASE_URL}/api/v1/ws`),
      // 디버그 log 찍는함수 -> 기본값 : 아무것도 안함
      //   debug: (str) => console.log(new Date(), str),
      // 연결이 끊기면 재접속시도까지 기다리는 시간
      reconnectDelay: 0,
      // 서버로부터 오는거 감지하는 주기(ms)
      heartbeatIncoming: 4000,
      // 클라이언트에서 보내는 주기(ms)
      heartbeatOutgoing: 4000,
      // connect 요청할 때 보낼 헤더
      connectHeaders: {
        roomId,
      },
    });

    client.onConnect = async () => {
      setConnectionStatus("연결되었습니다");
      try {
        const previousChats = await getChatMsgMento(Number(roomId));
        setMessages(previousChats);
      } catch (e) {
        if ((e as APIerror).status === 500) {
          alert("채팅방 조회 권한이 없습니다");
          router.replace("/main");
        } else if ((e as APIerror).status === 404) {
          alert("채팅방이 존재하지 않습니다");
          router.replace("/main");
        } else if (String((e as APIerror).status) === "401") {
          alert(
            "로그인을 하셔야 채팅방에 입장하실 수 있습니다. 로그인페이지로 이동합니다."
          );
          router.replace("/login");
        } else {
          alert(
            "채팅방 조회 과정에서 오류가 발생했습니다. 메인페이지로 이동합니다"
          );
          router.replace("/main");
        }
        return;
      }
      client.subscribe(`/api/v1/chat/topic/${roomId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    };

    client.onDisconnect = () => {
      setConnectionStatus("오류가 발생했습니다");
    };

    client.activate();
    clientRef.current = client;

    client.onStompError = (e) => {
      alert(
        "채팅방 연결에 실패하였습니다. 멘토가 ai 채팅방 연결을 시도중일 수 있습니다."
      );
      router.replace("/main");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      if (connectionStatus === "연결중입니다") {
        setConnectionStatus("연결에 실패하였습니다");
      }
      clientRef.current.deactivate();
      clientRef.current = null;
      setConnectionStatus("연결이 종료되었습니다");
    }
  }, [connectionStatus]);

  const sendMessage = useCallback((text: string, roomId: string) => {
    if (
      clientRef.current &&
      clientRef.current.connected &&
      text.trim() !== ""
    ) {
      const message = {
        content: text,
        attachmentId: 0,
      };
      clientRef.current.publish({
        destination: `/api/v1/chat/app/send`,
        body: JSON.stringify(message),
        headers: { roomId },
      });
    } else if (!clientRef.current || !clientRef.current.connected) {
      setConnectionStatus("연결되지않음");
      clientRef.current?.deactivate();
    }
  }, []);
  return {
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
    messages,
    clientRef,
  };
}
