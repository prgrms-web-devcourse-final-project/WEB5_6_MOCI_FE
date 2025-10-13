import { BASE_URL } from "./constants/config";
import { APIerror } from "./getChatMsgMento";

export const login = async (formInput: {
  userId: string;
  password: string;
}) => {
  formInput.userId = formInput.userId.replace(/-/g, ""); // 하이픈 제거

  const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset: UTF-8",
    },
    credentials: "include",
    body: JSON.stringify({ ...formInput, loginType: "PHONE" }),
  });

  const data = await res.json();
  if (!res.ok) {
    const error: APIerror = { status: data.code, message: data.message };
    throw error;
  }

  return data.data.user;
};
