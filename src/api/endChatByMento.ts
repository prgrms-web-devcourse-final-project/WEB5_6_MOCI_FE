import { BASE_URL } from "./constants/config";
import { APIerror } from "./getChatMsgMento";

export const endChatByMento = async (roomId: string) => {
  const res = await fetch(
    `${BASE_URL}/api/v1/chat/mentor/mentor/room/exit/${roomId}`,
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
