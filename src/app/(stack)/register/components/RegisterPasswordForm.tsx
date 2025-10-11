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

  const isPasswordValidLength = password.length !== 0 && password.length < 8;

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
        <h3 className="text-2xl font-bold">비밀번호를 입력해 주세요.</h3>
        <div className="flex gap-2 mt-4">
          <label htmlFor="password" className="sr-only">
            비밀번호
          </label>
          <Input
            id="password"
            placeholder="비밀번호"
            type={hidePW ? "password" : "text"}
            required
            value={password}
            ref={inputRef}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
          />
          <button
            type="button"
            onClick={toggleHidePW}
            aria-label="비밀번호 표시/숨기기"
            aria-pressed={hidePW}
          >
            {hidePW ? <EyeClose /> : <EyeOpen />}
          </button>
        </div>
        {isPasswordValidLength && (
          <p id="confirmPassword-error" className="mt-2 text-sm text-red-500">
            비밀번호는 8자 이상으로 입력해주세요.
          </p>
        )}
        <div className="flex gap-2 mt-4">
          <label htmlFor="confirmPassword" className="sr-only">
            비밀번호 확인
          </label>
          <Input
            id="confirmPassword"
            placeholder="비밀번호 확인"
            type={hidePWValidate ? "password" : "text"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-describedby="confirmPassword-error"
          />
          <button
            type="button"
            onClick={toggleHidePWValidate}
            aria-label="비밀번호 표시/숨기기"
            aria-pressed={hidePWValidate}
          >
            {hidePWValidate ? <EyeClose /> : <EyeOpen />}
          </button>
        </div>
        {passwordsMismatch && (
          <p id="confirmPassword-error" className="mt-2 text-sm text-red-500">
            비밀번호가 일치하지 않습니다.
          </p>
        )}
      </div>

      <Button
        size="md"
        fullWidth={true}
        type="submit"
        color="darkgreen"
        aria-disabled={!isValid || isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? "처리중..." : "회원가입 완료"}
      </Button>
    </form>
  );
}
export default RegisterPasswordForm;
