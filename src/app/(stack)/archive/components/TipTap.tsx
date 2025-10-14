"use client";

import { uploadFile } from "@/api/uploadFile";
import Button from "@/shared/components/Button";
import Image from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extensions/placeholder";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";

interface Props {
  onChange: (value: JSONContent) => void;
  onFileAdd: (newFileId: number, newFileUrl: string) => void;
  initialValue?: JSONContent; // ✅ 추가 (수정 모드 지원)
}

function TipTapEditor({ onChange, onFileAdd, initialValue }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState(0); // 강제 리렌더링용 state

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Placeholder.configure({
        placeholder: "글을 입력해주세요.",
      }),
    ],
    content: initialValue ?? "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),

    onSelectionUpdate: () => setUpdateTrigger((v) => v + 1),
    onTransaction: () => setUpdateTrigger((v) => v + 1),
  });

  // editor 상태가 바뀔 때마다 리렌더링
  useEffect(() => {
    if (editor && initialValue) {
      const current = editor.getJSON();
      if (JSON.stringify(current) !== JSON.stringify(initialValue)) {
        editor.commands.setContent(initialValue);
      }
    }
  }, [editor, initialValue]);

  if (!editor) {
    return null;
  }

  // 이미지 파일 업로드
  const handleImageUpload = async (file: File) => {
    try {
      const { id, url, fileUrl } = await uploadFile(file);

      const img = new window.Image();
      img.src = url;

      img.onload = () => {
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        editor
          .chain()
          .focus()
          .setImage({
            src: url,
            alt: file.name,
            width: naturalWidth,
            height: naturalHeight,
          })
          .run();

        onFileAdd(id, fileUrl);
      };
    } catch{
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  return (
    <div className="w-full px-2 border-1 rounded-lg mt-2 flex-1 overflow-hidden">
      {/* 툴바 */}
      <div className="py-2 flex gap-2 border-b-1 border-gray">
        <Button
          type="button"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "box-border bg-green-default text-white border-2 border-green-default hover:bg-green-hover active:bg-green-hover"
              : "box-border bg-white text-black border-2 border-green-default hover:bg-gray-50"
          }
        >
          제목
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph")
              ? "box-border bg-green-default text-white border-2 border-green-default hover:bg-green-hover active:bg-green-hover"
              : "box-border bg-white text-black border-2 border-green-default hover:bg-gray-50"
          }
        >
          본문
        </Button>
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
          사진첨부
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
        className="flex-1 max-h-[60dvh] rounded-md text-black overflow-y-auto"
      />
    </div>
  );
}
export default TipTapEditor;
