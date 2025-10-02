export const getChatMsgMento = async (roomId: number) => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/chat/mentor/message/${roomId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset: UTF-8",
        },
        credentials: "include",
      }
    );
    if (!res.ok) {
      throw new Error("채팅방 메시지 불러오기에 실패하였습니다");
    }
    const data = await res.json();
    return data.data;
  } catch (e) {
    console.error(e);
  }
};
