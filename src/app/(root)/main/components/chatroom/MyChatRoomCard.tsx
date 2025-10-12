/**
 * 나의 채팅방 목록에서 사용되는 카드 컴포넌트
 * - 질문 내용 표시
 * - 입장 버튼
 */
import Button from "@/shared/components/Button";

type MyChatRoomCardProps = {
  question:string; //질문 내용 
  onEnter: () => void;
}

function MyChatRoomCard({question, onEnter}: MyChatRoomCardProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-lightgreen border-b-1 border-darkgreen-default">
      <p className="font-semibold text-xl truncate flex-1 min-w-0">
        {question}
      </p>

      <Button 
        color="darkgreen"
        onClick={onEnter}
        className="shrink-0"
      >
        입장
      </Button>
    </div>
  )
}
export default MyChatRoomCard