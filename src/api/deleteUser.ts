import { BASE_URL } from "./constants/config";

export const deleteUser = async (confirmed: boolean) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/me`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ confirmWithdrawal: confirmed }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const msg = errorData?.message ?? "회원탈퇴에 실패했습니다.";
    throw new Error(msg);
  }
  return await res.json();
};
