import { BASE_URL } from "./constants/config";

export const updateDigitalLevel = async (answers: (boolean | null)[]) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/digital-level`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      answers: answers,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const msg = errorData?.message ?? "디지털 레벨 등록에 실패했습니다.";
    throw new Error(msg);
  }
  return await res.json();
};
