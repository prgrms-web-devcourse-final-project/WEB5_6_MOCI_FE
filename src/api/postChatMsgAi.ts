export const postChatMsgAi = async(
  roomId: number,
  content: string,
) => {
  const res = await fetch(`http://localhost:8080/api/v1/chat/ai/rooms/${roomId}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      content,
    }),
  });

  if(!res.ok){
    throw new Error(`메시지 전송 실패했습니다.${res.status}`);
  }

  const data = await res.json();
  return data.data;
};