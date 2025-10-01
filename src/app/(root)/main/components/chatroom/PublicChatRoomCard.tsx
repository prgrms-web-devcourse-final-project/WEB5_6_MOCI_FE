/**
 * 멘티찾기, 전체채팅방에서 사용되는 카드 컴포넌트
 * - 멘티 프로필 이미지
 * - 멘티 닉네임
 * - 채팅방 제목(질문)
 * - 카테고리
 * - 디지털 역량 수준
 * - 입장하기 버튼
 */

import Button from "@/shared/components/Button";
import Image from "next/image";

type PublicChatRoomCardProps = {
  mentee_nickname: string;
  title: string;
  category: string;
  digital_level: string;
  // hasAlarm : boolean; //추후 알림 기능 구현시 사용
  onEnter: () => void; 
}

function PublicChatRoomCard({
  mentee_nickname,
  title,
  category,
  digital_level,
  // hasAlarm,
  onEnter,
}: PublicChatRoomCardProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b-1 border-darkgreen-default ">
      {/*멘티,채팅방 정보 */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-gray">
          <Image
            src="/user_profile.png"
            alt="기본 프로필 이미지"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <p className="text-sm text-darkgray">멘티 : {mentee_nickname}</p>
          <p className="text-xl font-semibold">{title}</p>
          <div className="flex gap-2 mt-1">
            <span className="px-4 py-1 text-sm bg-lightgreen rounded-2xl">Lv.{digital_level}</span>
            <span className="px-4 py-1 text-sm bg-lightgreen rounded-2xl">{category}</span>
          </div>
        </div>
      </div>

      {/*입장하기 버튼 */}
      <div className="relative">
        <Button
          onClick={onEnter}
          color="darkgreen"
          size="sm"
          className="text-lg"
        >
          입장하기
        </Button>
      </div>
    </div>
  )
}
export default PublicChatRoomCard