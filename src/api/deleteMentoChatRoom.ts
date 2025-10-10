import { APIerror } from "./getChatMsgMento";

export const deleteMentoChatRoom = async (roomId: string) => {
  const res = await fetch(
    `http://localhost:8080/api/v1/chat/mentor/mentee/room/${roomId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset: UTF-8",
      },
      credentials: "include",
    }
  );
  const data = await res.json();
  if (!res.ok) {
    const error: APIerror = { status: data.code, message: data.message };
    throw error;
  }
  return data.data;
};
