import { BASE_URL } from "./constants/config";

export const changeEmail = async (newEmail: string) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/email`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: newEmail,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const msg = errorData?.message ?? "이메일 변경에 실패했습니다.";
    throw new Error(msg);
  }
  return await res.json();
};
