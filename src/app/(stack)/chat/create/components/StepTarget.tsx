"use client";

import Button from "@/shared/components/Button";
import { ChatTarget } from "@/types/chat";

type StepTargetProps = {
  value: ChatTarget;
  onSelect: (target: ChatTarget) => void;
  onSubmit: () => void;
};

function StepTarget({ value, onSelect, onSubmit }: StepTargetProps) {
  return (
    <div className="w-full flex-1 overflow-hidden px-[10vw] sm:px-16 flex flex-col justify-center items-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-15">
        누구에게 질문할까요?
      </h2>

      <div className="flex flex-col w-full gap-8">
        <Button
          fullWidth
          onClick={() => onSelect("mentor")}
          className={
            value === "mentor"
              ? "bg-green-hover ring-4 ring-darkgreen-default"
              : ""
          }
          aria-label={`멘토에게 질문하기${value === "mentor"}?"선택됨":""`}
        >
          멘토에게 질문하기
        </Button>

        <Button
          fullWidth
          onClick={() => onSelect("ai")}
          className={`mb-25 ${
            value === "ai" ? "bg-green-hover ring-4 ring-darkgreen-default" : ""
          }`}
        >
          AI에게 질문하기
        </Button>

        <Button color="yellow" fullWidth onClick={onSubmit} disabled={!value}>
          채팅방 만들기
        </Button>
      </div>
    </div>
  );
}
export default StepTarget;
