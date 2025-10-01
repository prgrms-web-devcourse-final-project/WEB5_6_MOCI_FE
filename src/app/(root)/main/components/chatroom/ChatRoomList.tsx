/**
 * 채팅방 리스트 컴포넌트
 * - children으로 채팅방 카드들을 받음
 * - children이 없을 경우 emptyMessage를 표시
 */
type ChatRoomListProps = {
  children?: React.ReactNode;
  emptyMessage ?: string;
}


function ChatRoomList({children, emptyMessage}: ChatRoomListProps) {
  const isEmpty = !children || (Array.isArray(children) && children.length === 0);

  if (isEmpty) {
    return (
      <div className="flex-center py-30 text-darkgray">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {children}
    </div>
  )
}
export default ChatRoomList