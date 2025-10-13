import { JSONContent } from "@tiptap/react";
import { BASE_URL } from "./constants/config";

export const uploadPost = async (
  title: string,
  description: JSONContent,
  category: string,
  subCategory?: string,
  fileIds?: number[]
) => {
  const res = await fetch(`${BASE_URL}/api/v1/admin/archive/public`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      title,
      description: JSON.stringify(description),
      category,
      subCategory: "",
      fileIds,
    }),
  });

  if (!res.ok) {
    throw new Error("게시글 업로드 실패");
  }

  const data = await res.json();

  return { id: data.data.id };
};
