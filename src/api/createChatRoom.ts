
export const createChatRoom = async (
  category:string,
  question:string,
  target:string
  ) => {
  let endpoint;
  //target이 ai,mentor일 때 endpoint 구분
  if(target === 'ai'){
    endpoint = 'http://localhost:8080/api/v1/chat/ai/room';
  }else{
    endpoint = 'http://localhost:8080/api/v1/chat/mentor/mentee/room';
  }
 
  try{
    const res = await fetch(endpoint, {
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
      throw new Error('채팅방 생성 실패했습니다.');
    }

    const json = await res.json();

    //target별로 방 ID 다르게 받기
    const roomId =
      target === "ai"
        ? json.data.userMessage.roomId
        : json.data.id;
        
    return { id: roomId, target };
  }catch(e){
    if(e instanceof Error){
      throw new Error(e.message);
    }
    throw new Error('채팅방 생성 실패했습니다.');
  }
};
