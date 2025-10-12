import { getArchive } from "@/api/getArchive";
import Back from "../../components/Back";
import React from "react";
import { parseDescription } from "../../components/parseDescription";
import Image from "next/image";
import PostDetailButton from "../../components/PostDetailButton";

interface TipTapTextMark {
  type: "bold" | "link";
  attrs?: {
    href?: string;
  };
}

interface TipTapNodeAttrs {
  level?: number;
  src?: string;
  alt?: string;
}

interface TipTapNode {
  type: string;
  text?: string;
  marks?: TipTapTextMark[];
  attrs?: TipTapNodeAttrs;
  content?: TipTapNode[];
}

interface TipTapDoc {
  type: "doc";
  content: TipTapNode[];
}

async function page({ params }: { params: Promise<{ id: number }> }) {
  const param = await params;
  const id = param.id;
  const { title, createdAt, description } = await getArchive(id);

  const parsed = parseDescription(description);

  const renderContent = (node: TipTapNode, key: number): React.ReactNode => {
    switch (node.type) {
      case "heading": {
        const level = node.attrs?.level || 1;
        return React.createElement(
          `h${level}`,
          { key },
          node.content?.map((child, i) => renderContent(child, i))
        );
      }
      case "paragraph": {
        return (
          <p key={key}>
            {node.content?.map((child, i) => renderContent(child, i))}
          </p>
        );
      }
      case "text": {
        let textElement: React.ReactNode = node.text;
        if (node.marks) {
          node.marks.forEach((mark) => {
            if (mark.type === "bold") {
              textElement = <strong key={key}>{textElement}</strong>;
            }
            if (mark.type === "link") {
              textElement = (
                <a
                  key={key}
                  href={mark.attrs?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {textElement}
                </a>
              );
            }
          });
        }
        return <span key={key}>{textElement}</span>;
      }
      case "image": {
        const src = node.attrs?.src ?? "";
        const alt = node.attrs?.alt ?? "";
        return (
          <div key={key} className="my-3">
            <Image src={src} alt={alt} style={{ maxWidth: "100%" }} />
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-2 py-10 px-5">
      <h2 className="text-3xl  font-bold px-3 py-2 break-keep border-1 border-gray rounded-lg">
        {title}
      </h2>

      <div className="text-xl px-3 py-2 overflow-y-auto flex-1 break-keep border-1 border-gray rounded-lg">
        {parsed.type === "json" ? (
          <div className="prose">
            {parsed.value.content.map((node: TipTapNode, i: number) =>
              renderContent(node, i)
            )}
          </div>
        ) : (
          <p>{parsed.value}</p>
        )}
      </div>
      <p className="text-xl px-3 py-2 text-darkgray">
        작성일 : {createdAt.slice(0, 10)}
      </p>
      <PostDetailButton />
    </div>
  );
}

export default page;
