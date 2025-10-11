import { BASE_URL } from "./constants/config";
import { APIerror } from "./getChatMsgMento";

export const joinChatRoom = async (id: number) => {
  const res = await fetch(
    `${BASE_URL}/api/v1/chat/mentor/mentor/room/join/${id}`,
    {
      method: "PUT",
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
