"use client";
import Image from "next/image";
import O from "@/assets/O.svg";
import X from "@/assets/X.svg";
import { useState } from "react";
import Button from "@/shared/components/Button";

// 문제
const questions = [
  { id: 1, question: "나는 유튜브에서 동영상을 시청할 수 있다" },
  { id: 2, question: "나는 네이버, 다음에서 필요한 정보를 검색할 수 있다" },
  {
    id: 3,
    question: "나는 휴대폰 카메라로 사진을 찍고 갤러리에서 확인할 수 있다",
  },
  { id: 4, question: "나는 카카오톡에서 사진이나 동영상을 보낼 수 있다" },
  {
    id: 5,
    question:
      "나는 온라인 쇼핑몰(쿠팡, G마켓 등)에서 상품을 검색하고 주문할 수 있다",
  },
];

function OXQuiz() {
  const [current, setCurrent] = useState<number>(0); // 현재문제번호를 저장하기 위한 변수
  // 사용자가 입력한 답을 저장하기 위한 변수
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(questions.length).fill(null)
  );

  // ox에 따라 true/false로 답 저장하기
  const handleAnswer = (value: "o" | "x") => {
    const newAnswers = [...answers];
    newAnswers[current] = value === "o";
    setAnswers(newAnswers);
  };

  // 이전 문제로 이동
  const goBack = () => current > 0 && setCurrent((c) => c - 1);

  const goNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else console.log(answers); // TODO : 회원가입 API 호출하기
  };

  return (
    <>
      {/* aria-live : polite 문제 바뀌면 자동으로 읽어줌 */}
      <p className="text-2xl font-bold" aria-live="polite" tabIndex={0}>
        문제
        <span className="text-green-default"> {current + 1}</span> /{" "}
        {questions.length}
      </p>

      <section className="flex w-full flex-col justify-center items-center gap-5">
        <p className="sr-only">문제 {current + 1}</p>

        {/* aria-live : polite 문제 바뀌면 자동으로 읽어줌, 너무 긴 텍스트는 28px로 폰트사이즈 줄이기 */}
        <p
          className={` ${
            questions[current].question.length > 40 ? "text-[28px]" : "text-3xl"
          } font-bold text-center"`}
          tabIndex={0}
          aria-live="polite"
        >
          {questions[current].question}
        </p>
        <fieldset role="radiogroup" className="w-full py-2">
          <legend className="sr-only">정답선택하기</legend>

          <div className="flex gap-[8vw] justify-center">
            {/* o 버튼 */}
            <label
              className={`w-1/3 max-w-45 relative aspect-square rounded-lg bg-lightyellow hover:bg-lightgreen active:bg-lightgreen ${
                answers[current] === true && "ring-4 ring-green-default"
              }`}
            >
              <input
                type="radio"
                name={`문제${current + 1}`}
                className="sr-only"
                // checked={answers[current] === true}
                onChange={() => handleAnswer("o")}
                value="o"
                checked={answers[current] === true}
                aria-label="o (할 수 있다)"
              />
              <Image
                src={O}
                alt=""
                fill
                className=" object-contain p-6 cursor-pointer"
                priority
                draggable={false}
              />
            </label>
            {/* x버튼 */}
            <label
              className={`w-1/3 max-w-45 relative aspect-square rounded-lg bg-lightyellow hover:bg-lightgreen active:bg-lightgreen  ${
                answers[current] === false && "ring-4 ring-green-default"
              }`}
            >
              <input
                type="radio"
                name={`문제${current + 1}`}
                className="sr-only"
                // checked={answers[current] === false}
                onChange={() => handleAnswer("x")}
                value="x"
                checked={answers[current] === false}
                aria-label="x (할 수 없다)"
              />
              <Image
                src={X}
                alt=""
                fill
                className="object-contain p-6 cursor-pointer"
                priority
                draggable={false}
              />
            </label>
          </div>
        </fieldset>
      </section>

      {/* 버튼 section */}
      <nav aria-label="문제 이동" className="w-full flex flex-col gap-2.5">
        <Button
          color="darkgreen"
          fullWidth
          onClick={goBack}
          disabled={current === 0}
          aria-label="이전문제로 이동"
          className="enabled:hover:shadow-2xl enabled:hover:scale-y-105 enabled:hover:ring-4 enabled:hover:ring-darkgreen-default enabled:active:shadow-2xl enabled:active:scale-y-105 enabled:active:ring-4 enabled:active:ring-darkgreen-default"
        >
          이전
        </Button>
        <Button
          fullWidth
          onClick={goNext}
          disabled={answers[current] === null}
          aria-label={
            current === questions.length - 1 ? "완료" : "다음문제로 이동"
          }
          className="enabled:hover:shadow-2xl enabled:hover:scale-y-105 enabled:hover:ring-4 enabled:hover:ring-darkgreen-default enabled:active:shadow-2xl enabled:active:scale-y-105 enabled:active:ring-4 enabled:active:ring-darkgreen-default"
        >
          {current === questions.length - 1 ? "완료" : "다음"}
        </Button>
      </nav>
    </>
  );
}

export default OXQuiz;
