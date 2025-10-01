"use client";

import { uploadFile } from "@/api/uploadFile";
import Button from "@/shared/components/Button";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";

interface Props {
  onChange: (value: object) => void;
}

function TipTapEditor({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState(0); // 강제 리렌더링용 state

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>여기에 글을 작성해보세요</p>",
    immediatelyRender: false,
  });

  // editor 상태가 바뀔 때마다 리렌더링
  useEffect(() => {
    if (!editor) return;
    const handleUpdate = () => {
      const json = editor.getJSON();
      onChange(json);
    };
    editor.on("update", handleUpdate);
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, onChange]);

  if (!editor) {
    return null;
  }

  // 이미지 파일 업로드
  const handleImageUpload = async (file: File) => {
    try {
      const { url } = await uploadFile(file);

      editor.chain().focus().setImage({ src: url }).run();
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
    }
  };

  return (
    <div className="px-2">
      {/* 툴바 */}
      <div className="my-2 flex gap-2">
        <Button
          type="button"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "box-border bg-green-default text-white border-2 border-green-default hover:bg-green-hover active:bg-green-hover"
              : "box-border bg-white text-black border-2 border-green-default hover:bg-gray-50"
          }
        >
          B
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="box-border bg-white text-black border-2 border-green-default hover:bg-gray-50"
        >
          이미지
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
      </div>

      {/* 에디터 */}
      <EditorContent
        editor={editor}
        className="w-full min-h-[320px] resize-none px-4 py-3 rounded-md text-black border-black/25 outline-none"
      />
    </div>
  );
}
export default TipTapEditor;
