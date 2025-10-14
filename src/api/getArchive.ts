import { BASE_URL } from "./constants/config";

export const getArchive = async (id: number) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/archive/public/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset: UTF-8",
      },
      credentials: "include",
    });
    if (!res.ok) {
      alert("교육자료 불러오기에 실패하였습니다.");
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch {
    alert("교육자료를 불러오는 중 오류가 발생했습니다.");
    return null;
  }
};
