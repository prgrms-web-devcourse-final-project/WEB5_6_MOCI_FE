import { BASE_URL } from "./constants/config";

export const postChatMsgAiStream = async (
  roomId: number,
  content: string,
  onMessage: (msg: string) => void,
  onInit?: () => void,
  onError?: (err: unknown) => void
) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/chat/ai/rooms/${roomId}/ask-stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content }),
    });

    if (!res.ok || !res.body) {
      throw new Error(`스트리밍 연결 실패: ${res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";
    let currentEvent = "";
    let dataBuffer: string[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // 마지막 잘린 줄은 다음 턴으로

      for (const line of lines) {
        if (line.startsWith("event:")) {
          currentEvent = line.replace("event:", "").trim();
        } else if (line.startsWith("data:")) {
          const data = line.replace(/^data:\s*/, "");
          dataBuffer.push(data);
        } else if (line.trim() === "") {
          // 이벤트 끝 → 모인 데이터 전달
          const fullData = dataBuffer.join("\n");
          dataBuffer = [];

          if (currentEvent === "init") {
            onInit?.();
          } else if (currentEvent === "delta" && fullData) {
            onMessage(fullData);
          }
        }
      }
    }
  } catch (err) {
    onError?.(err);
  }
};
