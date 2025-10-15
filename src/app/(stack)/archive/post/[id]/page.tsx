import { getArchive } from "@/api/getArchive";
import React from "react";
import { parseDescription } from "../../utils/parseDescription";
import Image from "next/image";
import PostDetailButton from "../../components/PostDetailButton";
import { BASE_URL } from "@/api/constants/config";

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
  width?: number;
  height?: number;
}

interface TipTapNode {
  type: string;
  text?: string;
  marks?: TipTapTextMark[];
  attrs?: TipTapNodeAttrs;
  content?: TipTapNode[];
}

type Category =
  | "KAKAO_TALK"
  | "YOUTUBE"
  | "KTX"
  | "INTERCITY_BUS"
  | "BAEMIN"
  | "COUPANG";

async function page({ params }: { params: Promise<{ id: number }> }) {
  const param = await params;
  const id = param.id;
  const { title, createdAt, description, category } = await getArchive(id);

  const parsed = parseDescription(description);

  const categoryKR = (category: Category) => {
    switch (category) {
      case "KAKAO_TALK":
        return "카카오톡";

      case "YOUTUBE":
        return "유튜브";

      case "KTX":
        return "기차";

      case "INTERCITY_BUS":
        return "버스";

      case "BAEMIN":
        return "배달";

      case "COUPANG":
        return "쿠팡";

      default:
        break;
    }
  };

  const renderContent = (node: TipTapNode, key: number): React.ReactNode => {
    switch (node.type) {
      case "heading": {
        const level = node.attrs?.level || 1;
        return React.createElement(
          `h${level}`,
          { key, className: "text-3xl font-bold" },
          node.content?.map((child, i) => renderContent(child, i))
        );
      }
      case "paragraph": {
        if (!node.content || node.content.length === 0) {
          return (
            <p key={key}>
              <br />
            </p>
          );
        }

        return (
          <p key={key} className="text-2xl">
            {node.content.map((child, i) => renderContent(child, i))}
          </p>
        );
      }
      case "text": {
        let textElement: React.ReactNode = node.text;
        if (node.marks) {
          node.marks.forEach((mark) => {
            if (mark.type === "bold") {
              textElement = (
                <strong key={key} className="text-2xl font-bold">
                  {textElement}
                </strong>
              );
            }
            if (mark.type === "link") {
              textElement = (
                <a
                  key={key}
                  href={mark.attrs?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-blue-500 hover:underline active:underline visited:text-purple-900 word-break: break-all"
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
        const naturalWidth = node.attrs?.width ?? "";
        const naturalHeight = node.attrs?.height ?? "";

        const isSrcFromOut = (src: string) => {
          return !src.startsWith(BASE_URL);
        };

        return (
          <div key={key} className="my-3 flex-center">
            <Image
              src={src}
              alt={alt}
              width={Number(naturalWidth) <= 500 ? Number(naturalWidth) : 500}
              height={
                Number(naturalHeight) <= 600 ? Number(naturalHeight) : 600
              }
              className="max-w-full min-w-10"
              unoptimized={isSrcFromOut(src)}
            />
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100dvh-3rem)] flex flex-col flex-1 w-full">
      <div className="flex-1 flex flex-col gap-2 pt-1 pb-10 px-5 overflow-y-auto">
        <div className="flex-center w-full">
          <p className="text-2xl font-semibold">[{categoryKR(category)}]</p>
          <h2 className="text-3xl  font-bold px-3 py-2 break-keep flex-1">
            {title}
          </h2>
        </div>

        <div className="flex-1 shrink-0 text-xl px-3 py-2 border-1 border-gray rounded-lg w-full">
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
    </div>
  );
}

export default page;
