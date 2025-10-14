import { BASE_URL } from "./constants/config";

export async function getChatMsgAi(roomId: number): Promise<
  {
    id: number;
    roomId: number;
    senderType: "HUMAN" | "AI";
    content: string;
    createdAt: string;
    senderName: string;
  }[]
> {
  const res = await fetch(
    `${BASE_URL}/api/v1/chat/ai/rooms/${roomId}/messages`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await res.json();
  return data;
}
