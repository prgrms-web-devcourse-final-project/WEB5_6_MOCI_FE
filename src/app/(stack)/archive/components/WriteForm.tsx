"use client";
import Button from "@/shared/components/Button";
import TipTap from "../components/TipTap";
import { useEffect, useMemo, useState } from "react";
import { uploadPost } from "@/api/uploadPost";
import { useRouter } from "next/navigation";
import { JSONContent } from "@tiptap/react";
import { editPost } from "@/api/editPost";
import { useAuthStore } from "@/store/authStore";
import { deleteFile } from "@/api/deleteFile";
import debounce from "lodash.debounce";
import { splitUsedAndUnusedFiles } from "../utils/splitUsedAndUnusedFiles";

interface PostFormProps {
  mode: "write" | "edit";

  initialData?: {
    id: number;
    title: string;
    description: JSONContent | string;
    category: string;
    files: {
      id: number;
      file_name: string;
      file_url: string;
      file_type: string;
    }[];
  };
}

interface Files {
  id: number;
  url: string;
  isUsed: boolean;
}

function WriteForm({ mode, initialData }: PostFormProps) {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<JSONContent | null>(null);
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState<Files[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const route = useRouter();
  const user = useAuthStore((s) => s.user);
  const isLoadingUser = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (user?.role !== "ADMIN" && !isLoadingUser) {
      alert("관리자만 접근 가능한 페이지입니다.");
      route.back();
    }
    if (mode === "edit" && initialData) {
      setTitle(initialData.title);
      setCategory(initialData.category);

      const initialFiles: Files[] =
        initialData.files.map((f) => ({
          id: f.id,
          url: f.file_url,
          isUsed: false,
        })) ?? [];
      setFiles(initialFiles);

      let desc: JSONContent;

      if (typeof initialData.description === "string") {
        try {
          desc = JSON.parse(initialData.description);
        } catch {
          desc = {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: initialData.description }],
              },
            ],
          };
        }
      } else {
        desc = initialData.description;
      }

      setDescription(desc);
    }
  }, [mode, initialData, user?.role, route, isLoadingUser]);

  const handleFileAdd = (id: number, url: string) => {
    const newFile = { id, url, isUsed: false };
    setFiles((prev) => [...prev, newFile]);
  };

  const debouncedUpdateDescription = useMemo(
    () =>
      debounce((value: JSONContent) => {
        setDescription(value);
      }, 300),
    []
  );

  const isValidDescription =
    !!description &&
    Array.isArray(description.content) &&
    description.content.length > 0 &&
    (description.content.some((n) => n.type === "image") ||
      description.content.some(
        (n) => Array.isArray(n.content) && n.content.length > 0
      ));

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (category.trim() === "") {
      alert("카테고리를 선택해주세요");
      setIsLoading(false);
      return;
    }
    if (!title?.trim()) {
      alert("제목을 입력해주세요");
      setIsLoading(false);
      return;
    }
    if (!isValidDescription) {
      alert("본문을 입력해주세요");
      setIsLoading(false);
      return;
    }

    const { usedFiles, unusedFiles } = splitUsedAndUnusedFiles(
      files,
      description
    );
    const fileIds = usedFiles.map((file) => file.id);

    try {
      let postId: number;

      await Promise.all(unusedFiles.map((file) => deleteFile(file.url)));
      setFiles(usedFiles);

      if (mode === "write") {
        const res = await uploadPost({ title, description, category, fileIds });
        postId = res.id;
        alert("게시글이 업로드되었습니다");
      } else if (mode === "edit" && initialData) {
        await editPost({
          postId: initialData.id,
          title,
          description,
          category,
          fileIds,
        });
        postId = initialData.id;

        alert("게시글이 수정되었습니다");
      } else {
        throw new Error("잘못된 동작입니다.");
      }
      route.replace(`/archive/post/${postId}`);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "게시글 처리 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        onSubmit={handleSubmit}
        className="h-dvh flex-1 flex-center justify-between flex-col px-4"
      >
        <div className="mt-4 w-full flex">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-1 rounded-lg px-2 py-1"
            aria-label="카테고리 선택"
          >
            <option value="">카테고리 선택</option>
            <option value="KAKAO_TALK">카카오톡</option>
            <option value="YOUTUBE">유튜브</option>
            <option value="KTX">기차</option>
            <option value="INTERCITY_BUS">버스</option>
            <option value="BAEMIN">배달</option>
            <option value="COUPANG">쿠팡</option>
          </select>
          {/* 
          <input type="file" multiple name="" id="" /> */}
        </div>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={title ?? ""}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          className="mt-4 w-full text-4xl font-bold border-1 rounded-lg px-4 py-2"
        />

        <TipTap
          onChange={debouncedUpdateDescription}
          onFileAdd={handleFileAdd}
          initialValue={mode === "edit" ? description ?? undefined : undefined}
        />
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          aria-disabled={isLoading}
          className="mt-4"
        >
          {isLoading
            ? "처리 중..."
            : mode === "write"
            ? "글 작성하기"
            : "글 수정하기"}
        </Button>
      </div>
    </>
  );
}

export default WriteForm;
