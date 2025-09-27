"use client";
import Button from "@/shared/components/Button";

type StepQuestionProps = {
  value: string;
  onChange: (question: string) => void;
  onNext: () => void;
}

function StepQuestion({value, onChange, onNext}: StepQuestionProps) {

  return (
    <div className="w-full flex-1 overflow-hidden px-[10vw] sm:px-16 flex flex-col justify-center items-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-15">질문을 입력해주세요</h2>

      <div className="w-full">
        <textarea
          className="w-full h-50 p-2 border-2 border-green-default focus:ring-2 focus:ring-green-default focus:outline-none "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="질문을 입력해주세요"
          maxLength={300} //글자 제한 300자
        >
        </textarea>
        <div className="text-right text-sm text-gray mt-2">
          {value.length}자/300자
        </div>
      </div>
      
      <Button onClick={onNext} disabled={!value} fullWidth className="mt-8">다음</Button>

    </div>
  )
}
export default StepQuestion