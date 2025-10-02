export interface APIerror {
  status: number;
}

export const getChatMsgMento = async (roomId: number) => {
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
  const data = await res.json();
  if (!res.ok) {
    const error: APIerror = { status: data.code };
    throw error;
  }
  return data.data;
};
