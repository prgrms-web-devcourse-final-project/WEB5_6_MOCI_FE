import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useState, useEffect, useRef } from "react";
import EyeClose from "@/assets/icons/eyeClose.svg";
import EyeOpen from "@/assets/icons/eyeOpen.svg";

interface Props {
  onSubmit: (phone: string) => void;
  isKeyboardOpen: boolean;
  isLoading: boolean;
}

function RegisterPasswordForm({ onSubmit, isKeyboardOpen, isLoading }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [hidePW, setHidePW] = useState(true);
  const [hidePWValidate, setHidePWValidate] = useState(true);

  useEffect(() => {
    // 첫 번째 비밀번호 입력창에 자동 포커스
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || !confirmPassword.trim()) {
      return alert("비밀번호를 입력해주세요!");
    }
    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    onSubmit(password);
  };

  const toggleHidePW = () => {
    setHidePW(!hidePW);
  };
  const toggleHidePWValidate = () => {
    setHidePWValidate(!hidePWValidate);
  };

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const isValid =
    password.trim().length > 0 &&
    confirmPassword.trim().length > 0 &&
    !passwordsMismatch;

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col mt-20 justify-between h-full w-full ${
        isKeyboardOpen ? "mb-4" : "mb-20"
      }`}
    >
      <div>
        <h3 className="text-3xl font-bold">비밀번호를 입력해 주세요.</h3>
        <Input
          placeholder="비밀번호"
          type="password"
          required
          value={password}
          ref={inputRef}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={toggleHidePW}
          aria-label="비밀번호 표시/숨기기"
          aria-pressed={hidePW}
        >
          {hidePW ? <EyeOpen /> : <EyeClose />}
        </button>

        <Input
          placeholder="비밀번호 확인"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-4"
        />
        <button
          type="button"
          onClick={toggleHidePWValidate}
          aria-label="비밀번호 표시/숨기기"
          aria-pressed={hidePWValidate}
        >
          {hidePWValidate ? <EyeOpen /> : <EyeClose />}
        </button>
        {passwordsMismatch && (
          <p className="mt-2 text-sm text-red-500">
            비밀번호가 일치하지 않습니다.
          </p>
        )}
      </div>

      <Button
        size="md"
        fullWidth={true}
        type="submit"
        color="darkgreen"
        disabled={!isValid || isLoading}
      >
        {isLoading ? "처리중..." : "회원가입 완료"}
      </Button>
    </form>
  );
}
export default RegisterPasswordForm;
