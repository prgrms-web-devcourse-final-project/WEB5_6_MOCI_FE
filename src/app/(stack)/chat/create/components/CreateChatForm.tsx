"use client";

import { useState } from "react";
import StepCategory from "./StepCategory";
import StepQuestion from "./StepQuestion";
import StepTarget from "./StepTarget";
import { useRouter } from "next/navigation";
import { ChatTarget } from "@/types/chat";
import { createAIChatRoom } from "@/api/createAIChatRoom";
import { createMentorChatRoom } from "@/api/createMentorChatRoom";


type ChatFormData = {
  category: string;
  question: string;
  target: ChatTarget;
};

export default function CreateChatForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ChatFormData>({
    category: "",
    question: "",
    target: "" as ChatTarget,
  });
  const router = useRouter();

  const next = () => setStep((s) => s + 1);

  const handleSubmit = async() => {

    try{
       const result =
        formData.target === "ai"
          ? await createAIChatRoom(formData.category, formData.question)
          : await createMentorChatRoom(formData.category, formData.question);

      console.log("채팅방생성완료", result.id); // 추후 console 지우기

      if(result.target === "ai"){
        router.push(`/chat/${result.id}/ai`);
      }else{
        router.push(`/chat/${result.id}/mentor`);
      }
    }catch(e){
      alert(e);
    }
  }
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
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
