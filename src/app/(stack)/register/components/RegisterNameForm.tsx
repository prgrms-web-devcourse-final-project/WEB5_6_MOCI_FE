import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useState, useEffect, useRef } from "react";

interface Props {
  onSubmit: (name: string) => void;
  isKeyboardOpen: boolean;
}

function RegisterNameForm({ onSubmit, isKeyboardOpen }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 자동 포커스
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return alert("이름을 입력해주세요!");
    onSubmit(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col mt-20 justify-between h-full w-full ${
        isKeyboardOpen ? "mb-4" : "mb-20"
      }`}
    >
      <div>
        <h3 className="text-2xl font-bold">이름을 입력해 주세요.</h3>
        <label htmlFor="name" className="sr-only">
          이름
        </label>
        <Input
          id="name"
          placeholder="이름"
          className="mt-4"
          required
          value={value}
          ref={inputRef}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <Button
        size="md"
        fullWidth={true}
        type="submit"
        disabled={!value.trim()}
        aria-disabled={!value.trim()}
      >
        다음
      </Button>
    </form>
  );
}
export default RegisterNameForm;
