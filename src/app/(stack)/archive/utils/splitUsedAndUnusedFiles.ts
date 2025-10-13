import { JSONContent } from "@tiptap/react";

interface Files {
  id: number;
  url: string;
  isUsed: boolean;
}

//description에서 url만 뽑기
const extractFileUrlsFromDescription = (description: JSONContent) => {
  const urls: string[] = [];

  const extractUrlFromNode = (node: JSONContent) => {
    if (node.type === "image" && node.attrs?.src) {
      const url = node.attrs.src;
      const fileUrl = url.split("/").pop();
      urls.push(fileUrl);
    }
    if (node.content) node.content.forEach(extractUrlFromNode);
  };

  extractUrlFromNode(description);

  return urls;
};

export const splitUsedAndUnusedFiles = (
  files: Files[],
  description: JSONContent
) => {
  const usedUrls = extractFileUrlsFromDescription(description);

  const usedFiles: Files[] = [];
  const unusedFiles: Files[] = [];

  for (const file of files) {
    if (usedUrls.includes(file.url)) {
      usedFiles.push({ ...file, isUsed: true });
    } else {
      unusedFiles.push({ ...file, isUsed: false });
    }
  }

  return { usedFiles, unusedFiles };
};
