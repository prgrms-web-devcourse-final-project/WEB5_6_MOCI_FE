import { BASE_URL } from "./constants/config";

export const deleteFile = async (fileUrl: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/file?fileName=${fileUrl}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.log(` 파일 삭제 실패 (${fileUrl}):`, errData.message);
      return null;
    }

    const data = await res.json();
    return data.message;
  } catch (error) {
    console.log(`⚠️ 파일 삭제 중 오류 (${fileUrl}):`, error);
    return null;
  }
};
