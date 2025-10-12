import { JSONContent } from "@tiptap/react";
import { BASE_URL } from "./constants/config";

export const editPost = async (
  postId: number,
  title: string,
  description: JSONContent,
  category: string,
  subCategory?: string
) => {
  const res = await fetch(`${BASE_URL}/api/v1/admin/archive/public/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      title,
      description: JSON.stringify(description),
      category,
      subCategory: subCategory ?? "",
    }),
  });

  if (!res.ok) {
    throw new Error("게시글 수정 실패");
  }

  const data = await res.json();

  return { id: data.data.id };
};
