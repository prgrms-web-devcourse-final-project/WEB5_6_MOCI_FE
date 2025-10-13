import { BASE_URL } from "./constants/config";

export const checkDuplicateId = async (phone: string) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/phone-check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      phoneNumber: phone,
    }),
  });
  // 상태 코드별 에러 처리
  if (res.status === 400) {
    throw new Error("잘못된 전화번호 형식입니다.");
  }
  if (res.status === 500) {
    throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }

  if (!res.ok) {
    throw new Error(`알 수 없는 오류 (status: ${res.status})`);
  }

  const data = await res.json();

  if (data.data.available === false) {
    return "EXISTS";
  } else {
    return "NOT_FOUND";
  }
};
