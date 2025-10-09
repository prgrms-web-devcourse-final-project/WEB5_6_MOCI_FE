
export const createAIChatRoom = async(
  category:string,
  question:string,
  ) => { 
    const res = await fetch("http://localhost:8080/api/v1/chat/ai/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        category,
        question,
      }),
    });

    if(!res.ok){
      throw new Error('AI 채팅방 생성 실패했습니다.');
    }

    const json = await res.json();
    return { 
      id: json.data.userMessage.roomId, 
       target: "ai" as const,
    };
  
   }