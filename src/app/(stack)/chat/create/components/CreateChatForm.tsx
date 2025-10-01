"use client";

import { useState } from "react";
import StepCategory from "./StepCategory";
import StepQuestion from "./StepQuestion";
import StepTarget from "./StepTarget";
import { createChatRoom } from "@/api/createChatRoom";
import { useRouter } from "next/navigation";


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
  const router = useRouter();

  const next = () => setStep((s) => s + 1);

  const handleSubmit = async() => {

    try{
      const {id, target} = await createChatRoom(
        formData.category,//카테고리
        formData.question,//질문
        formData.target //질문 대상
      );

      console.log("채팅방생성완료", id); // 추후 console 지우기
      if(target === "ai"){
        router.push(`/chat/${id}/AI`);
      }else{
        router.push(`/chat/${id}/mento`);
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
