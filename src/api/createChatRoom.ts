
export const createChatRoom = async (
  category:string,
  title:string,
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
        title, //=> content나 question이 들어가야할 듯함
        category,
      }),
    });

    if(!res.ok){
      throw new Error('채팅방 생성 실패했습니다.');
    }

    const json = await res.json();

    return {id:json.data.id};
    

  }catch(e){
    if(e instanceof Error){
      throw new Error(e.message);
    }
    throw new Error('채팅방 생성 실패했습니다.');
  }
};
