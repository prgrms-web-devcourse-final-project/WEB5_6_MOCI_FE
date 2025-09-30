"use client";

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

  // 파일 업로드 함수
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("uploadFile", file);

    const res = await fetch("http://localhost:8080/api/v1/file", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    // 서버에서 반환된 URL 삽입
    editor
      .chain()
      .focus()
      .setImage({ src: `http://localhost:8080/uploads/${data.data.file_url}` })
      .run();
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
        className="w-full h-[320px] resize-none px-4 py-3 rounded-md text-black border-black/25 outline-none"
      />
    </div>
  );
}
export default TipTapEditor;
