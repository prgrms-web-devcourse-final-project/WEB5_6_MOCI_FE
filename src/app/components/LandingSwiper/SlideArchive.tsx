import Image from "next/image";

function SlideArchive() {
  return (
    <div className="flex flex-col flex-center text-center h-full border border-darkgreen-default rounded-lg">
      <h2 className="text-2xl font-bold ">교육 자료실 📚</h2>
      <p className="text-lg font-semibold">
        카카오톡, KTX 예매, 유튜브 시청 등 <br />
        일상 속 디지털 사용법을 쉽게 배우세요
      </p>

      <div className="relative flex justify-center">
        <Image
          src="/landing_swiper.png"
          alt="교육자료실 사용 예시 이미지"
          width={210}
          height={140}
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
export default SlideArchive