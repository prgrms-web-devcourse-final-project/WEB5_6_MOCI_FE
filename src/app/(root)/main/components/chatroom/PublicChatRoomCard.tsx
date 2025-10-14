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
  onEnter?: () => void;
};

function PublicChatRoomCard({
  // mentee_nickname,
  title,
  category,
  digital_level,
  // hasAlarm,
  onEnter,
}: PublicChatRoomCardProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b-1 border-darkgreen-default hover:bg-gray-50 active:bg-gray-50">
      {/*멘티,채팅방 정보 */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-gray shrink-0">
          <Image
            src="/user_profile.png"
            alt="기본 프로필 이미지"
            priority
            sizes="48px"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <button 
          type="button"
          className="flex-1 min-w-0 cursor-pointer text-left"
          onClick={onEnter}
          aria-label="채팅방 입장"
        >
          {/* <p className="text-sm text-darkgray">멘티 : {mentee_nickname}</p> */}
          <p className="text-xl font-semibold truncate w-[80%]">{title}</p>
          <div className="flex gap-2 mt-1 flex-wrap">
            {digital_level !== "" && (
              <span className="px-4 py-1 text-sm bg-lightgreen rounded-2xl shrink-0">
                Lv.{digital_level}
              </span>
            )}
            <span className="px-4 py-1 text-sm bg-lightgreen rounded-2xl shrink-0">
              {category}
            </span>
          </div>
        </button>
      </div>

      {/*입장하기 버튼 */}
      {onEnter && (
        <div className="relative shrink-0">
          <Button
            onClick={onEnter}
            color="darkgreen"
            size="sm"
            className="text-lg"
          >
            입장하기
          </Button>
        </div>
      )}
    </div>
  );
}
export default PublicChatRoomCard;
