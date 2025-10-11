import Image from "next/image";

function SlideIntro() {
  return (
    <div className="flex flex-col flex-center text-center h-full border border-darkgreen-default rounded-lg">
      <Image
        src="/logo.png"
        alt="디딤돌 로고"
        className="opacity-50 mb-4 h-auto w-auto mx-auto"
        width={100}
        height={100}
        priority
      />
      <p className="text-lg font-semibold">
        디딤돌은 디지털이 낯선 분들을 위해<br />
        멘토와 AI가 함께 도와드리는 서비스입니다.
      </p>
    </div>
  )
}
export default SlideIntro