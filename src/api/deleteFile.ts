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
      alert(`파일 삭제 실패 (${fileUrl})\n${errData.message || ""}`);
      return null;
    }

   const data = await res.json();
    alert(data.message || "파일이 삭제되었습니다.");
    return data.message;
  } catch (error) {
    alert(`파일 삭제 중 오류 발생 (${fileUrl})`);
    return null;
  }
};
