// export interface APIerror {
//   status: number;
//   message: string;
// }

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
  //  if (!res.ok) {
  //    const error: APIerror = { status: data.code, message: data.message };
  //    throw error;
  //  }
   return data.data;
}
