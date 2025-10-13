import { JSONContent } from "@tiptap/react";
import { BASE_URL } from "./constants/config";

interface Post {
  postId: number;
  title: string;
  description: JSONContent;
  category: string;
  subCategory?: string;
  fileIds?: number[];
}

export const editPost = async ({
  postId,
  title,
  description,
  category,
  subCategory,
  fileIds,
}: Post) => {
  const res = await fetch(`${BASE_URL}/api/v1/admin/archive/public/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      title,
      description: JSON.stringify(description),
      category,
      subCategory: subCategory ?? "",
      fileIds,
    }),
  });

  if (!res.ok) {
    throw new Error("게시글 수정 실패");
  }

  const data = await res.json();

  return { id: data.data.id };
};
