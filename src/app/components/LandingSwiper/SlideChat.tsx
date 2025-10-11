import { useEffect } from "react"
import { gsap } from "gsap";

function SlideChat() {
  
  // 말풍선 등장 애니메이션
  useEffect(() => {
    gsap.fromTo(".bubble", { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.4, 
        repeat: -1, 
        yoyo: true,
        duration : 0.9,
        ease: "power1.inOut",
      });
      
  }, []);

  return (
    <div className="flex flex-col flex-center text-center h-full border border-darkgreen-default rounded-lg">
      <h2 className="text-2xl font-bold mb-1">채팅 서비스 💬</h2>
      <p className="text-lg font-semibold">
        궁금한 건 바로 물어보세요!<br />
        멘토 또는 AI 와의 1:1 채팅으로 배우는 <br />
        디지털 생활 ✨
      </p>

      {/* 채팅 말풍선 */}
        <div className="relative flex flex-col gap-3 text-left w-[80%] max-w-[320px] mx-auto mt-1">
          <div className="self-end bg-lightgreen px-4 py-2 rounded-2xl shadow-md bubble">
            “유튜브 구독은 어떻게 해요?”
          </div>
          <div className="self-start bg-white px-4 py-2 rounded-2xl shadow-md bubble border">
            “이렇게 따라 해보세요”
          </div>
        </div>
    </div>
  )
}
export default SlideChat