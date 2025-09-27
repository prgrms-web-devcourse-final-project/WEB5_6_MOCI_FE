"use client";

import { useState } from "react";
import StepCategory from "./StepCategory";
import StepQuestion from "./StepQuestion";
import StepTarget from "./StepTarget";


type ChatFormData = {
  category: string;
  question: string;
  target: string;
};

export default function CreateChatForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ChatFormData>({
    category: "",
    question: "",
    target: "",
  });

  const next = () => setStep((s) => s + 1);

  return (
    <>
      {step === 0 && (
        <StepCategory
          value={formData.category}
          onSelect={(category) => setFormData({ ...formData, category })}
          onNext={next}
        />
      )}
      {step === 1 && (
        <StepQuestion
          value={formData.question}
          onChange={(q) => setFormData({ ...formData, question: q })}
          onNext={next}
        />
      )}
      {step === 2 && (
        <StepTarget
          value={formData.target}
          onSelect={(target) => setFormData({ ...formData, target })}
          onSubmit={() => {
            console.log("채팅방생성완료", formData); //추후에 console 지우기
            // TODO: API 호출 →채팅방 ID 응답-> /chat/[id] 이동
          }}
        />
      )}
    </>
  );
}
