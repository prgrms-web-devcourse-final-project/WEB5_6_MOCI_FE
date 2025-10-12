import { BASE_URL } from "./constants/config";

export const deletePost = async (archiveId: number) => {
  const res = await fetch(
    `${BASE_URL}/api/v1/admin/archive/public/${archiveId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("게시글 삭제 실패");
  }
};
