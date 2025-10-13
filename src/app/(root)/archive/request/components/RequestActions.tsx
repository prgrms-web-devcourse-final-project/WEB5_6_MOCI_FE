"use client";

import Button from "@/shared/components/Button";
import { RequestStatus } from "@/types/archiveRequest";

interface RequestActionsProps {
  userRole?: string;
  currentUserId?: number;
  requestId: number;
  requesterId: number;
  status: RequestStatus;
  onEdit: (requestId: number) => void;
  onDelete: (requestId: number) => void;
  onStatusChange: (requestId: number, status: RequestStatus) => void;
  isLoading: boolean;
}

function RequestActions({
  userRole,
  currentUserId,
  requestId,
  requesterId,
  status,
  onEdit,
  onDelete,
  onStatusChange,
  isLoading
}: RequestActionsProps) {
  const isAdmin = userRole === "ADMIN";
  const isMentor = userRole === "MENTOR";
  const isAuthor = isMentor && currentUserId === requesterId;
  const canEdit = status === "PENDING" || status === "REJECTED";

  if (isAdmin) {
    return (
      <div className="flex gap-3 w-full">
        <Button
          color="green"
          onClick={() => onStatusChange(requestId, "APPROVED")}
          disabled={isLoading || status === "APPROVED"}
          className="flex-1"
        >
          승인
        </Button>
        <Button
          color="red"
          onClick={() => onStatusChange(requestId, "REJECTED")}
          disabled={isLoading || status === "REJECTED"}
          className="flex-1"
        >
          거절
        </Button>
      </div>
    );
  }

  if (isMentor && isAuthor) {
    return (
      <div className="flex gap-3 w-full">
        <Button
          color="green"
          onClick={() => onEdit(requestId)}
          disabled={isLoading || !canEdit}
          className="flex-1"
        >
          수정
        </Button>
        <Button
          color="red"
          onClick={() => onDelete(requestId)}
          disabled={isLoading || status === "APPROVED"}
          className="flex-1"
        >
          삭제
        </Button>
      </div>
    );
  }

  return null;
}

export default RequestActions;
