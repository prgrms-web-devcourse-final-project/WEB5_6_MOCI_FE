
export async function getChatMsgAi(roomId: number): Promise<
  {
    id: number;
    roomId: number;
    senderType: "HUMAN" | "AI";
    content: string;
    createdAt: string;
  }[]
> {
  const res = await fetch(
    `http://localhost:8080/api/v1/chat/ai/rooms/${roomId}/messages`,
    {
      method: "GET",
      headers: { 
        "Content-Type": "application/json" 
      },
      credentials: "include",
    }
  );

 const data = await res.json();
 return data;  
}
