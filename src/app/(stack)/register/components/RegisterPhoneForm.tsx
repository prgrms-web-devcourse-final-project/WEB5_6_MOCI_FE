import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useState, useEffect, useRef } from "react";

interface Props {
  onSubmit: (phone: string) => void;
  isKeyboardOpen: boolean;
}

function RegisterPhoneForm({ onSubmit, isKeyboardOpen }: Props) {
  const [phone, setPhone] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 자동 포커스
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return alert("전화번호를 입력해주세요!");
    const rawPhone = phone.replace(/-/g, ""); // 하이픈 제거
    onSubmit(rawPhone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력받고 자동 하이픈 추가
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 3 && value.length <= 7) {
      value = value.slice(0, 3) + "-" + value.slice(3);
    } else if (value.length > 7) {
      value =
        value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11);
    }
    setPhone(value);
  };

  const isComplete = phone.length === 13;

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col mt-20 justify-between h-full w-full ${
        isKeyboardOpen ? "mb-4" : "mb-20"
      }`}
    >
      <div>
        <h3 className="text-3xl font-bold">전화번호를 입력해 주세요.</h3>
        <Input
          placeholder="전화번호"
          required
          value={phone}
          ref={inputRef}
          onChange={handleChange}
          type="tel"
          maxLength={13}
        />
      </div>

      <Button size="md" fullWidth={true} type="submit" disabled={!isComplete}>
        다음
      </Button>
    </form>
  );
}
export default RegisterPhoneForm;
