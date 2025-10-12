export const parseDescription = (description: string) => {
  try {
    const parsed = JSON.parse(description);
    //tiptap 객체 확인
    if (parsed && typeof parsed === "object" && parsed.type === "doc") {
      return { type: "json", value: parsed };
    } else {
      return { type: "text", value: description };
    }
  } catch {
    return { type: "text", value: description };
  }
};
