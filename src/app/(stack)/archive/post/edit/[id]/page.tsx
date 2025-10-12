"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getArchive } from "@/api/getArchive";
import WriteForm from "../../../components/WriteForm";
import { JSONContent } from "@tiptap/react";

interface PostData {
  id: number;
  title: string;
  description: string | JSONContent;
  category: string;
  subCategory?: string;
  createdAt?: string;
  updatedAt?: string;
}

function EditPage() {
  const params = useParams();
  const postId = Number(params.id);

  const [postData, setPostData] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArchive(postId);
        setPostData(data);
      } catch (e) {
        alert(e instanceof Error ? e.message : "게시글 불러오기 실패");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  if (isLoading) return <p className="p-4">불러오는 중...</p>;
  if (!postData)
    return <p className="p-4">게시글 데이터를 찾을 수 없습니다.</p>;

  return <WriteForm mode="edit" initialData={postData} />;
}

export default EditPage;
