"use client";

import Button from "@/shared/components/Button";
import { useArchiveRequestDetail } from "../../hooks/useArchiveRequestDetail";
import RequestDetailHeader from "./RequestDetailHeader";
import RequestDetailContent from "./RequestDetailContent";
import RequestActions from "../../components/RequestActions";

interface RequestDetailProps {
  requestId: number;
}

function RequestDetail({ requestId }: RequestDetailProps) {
  const {
    request,
    isLoading,
    isEditing,
    editData,
    setEditData,
    canAccess,
    user,
    handleEdit,
    handleSave,
    handleDelete,
    handleApprove,
    handleReject,
    handleCancelEdit,
    handleBack
  } = useArchiveRequestDetail(requestId);

  if (!canAccess) {
    return (
      <div className="flex-center flex-1">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">접근 권한이 없습니다</h2>
          <p className="text-gray">멘토 또는 관리자만 접근할 수 있습니다.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-center flex-1">
        <div className="text-center">
          <p className="text-xl">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex-center flex-1">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">요청을 찾을 수 없습니다</h2>
          <Button onClick={handleBack}>목록으로 돌아가기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <RequestDetailHeader onBack={handleBack} />
      
      <RequestDetailContent
        request={request}
        isEditing={isEditing}
        editData={editData}
        onEditDataChange={setEditData}
      />

      <div className="px-6 py-4 border-t border-gray-200">
        {isEditing ? (
          <div className="flex gap-3 w-full">
            <Button
              type="button"
              color="green"
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              type="button"
              color="darkgreen"
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "저장 중..." : "저장"}
            </Button>
          </div>
        ) : (
          <RequestActions
            userRole={user?.role}
            currentUserId={user?.id}
            requestId={requestId}
            requesterId={request.requester?.id}
            status={request.status}
            onEdit={() => handleEdit()}
            onDelete={() => handleDelete()}
            onStatusChange={(id, status) => {
              if (status === "APPROVED") handleApprove();
              else if (status === "REJECTED") handleReject();
            }}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default RequestDetail;
