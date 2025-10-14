import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { 
  ArchiveRequestResponseDto, 
  CreateArchiveRequestDto
} from "@/types/archiveRequest";
import { 
  getArchiveRequest, 
  updateArchiveRequest, 
  updateArchiveRequestStatus, 
  deleteArchiveRequest 
} from "@/api/archiveRequest";

export function useArchiveRequestDetail(requestId: number) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [request, setRequest] = useState<ArchiveRequestResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<CreateArchiveRequestDto>({
    title: "",
    description: "",
    category: "",
  });

  const isMentor = user?.role === "MENTOR";
  const isAdmin = user?.role === "ADMIN";
  const canAccess = isMentor || isAdmin;
  const isAuthor = request && isMentor && user?.id === request.requester?.id;
  const canEdit = request && (request.status === "PENDING" || request.status === "REJECTED");

  const fetchRequest = useCallback(async () => {
    try {
      const response = await getArchiveRequest(requestId);
      // 백엔드가 { data: { ... } } 형태로 응답하는 경우 처리
      const requestData = (response as { data?: ArchiveRequestResponseDto })?.data || response;
      setRequest(requestData as ArchiveRequestResponseDto);
    } catch {
      alert("요청 정보를 불러오는데 실패했습니다.");
      setRequest(null);
    } finally {
      setIsLoading(false);
    }
  }, [requestId]);

  const handleEdit = () => {
    if (request) {
      setEditData({
        title: request.title,
        description: request.description,
        category: request.category || "",
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!request) return;
    
    setIsLoading(true);
    try {
      const response = await updateArchiveRequest(requestId, editData);
      const updatedRequest = (response as { data?: ArchiveRequestResponseDto })?.data || response;
      setRequest(updatedRequest as ArchiveRequestResponseDto);
      setIsEditing(false);
      alert("수정이 완료되었습니다.");
    } catch {
      alert("수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    setIsLoading(true);
    try {
      await deleteArchiveRequest(requestId);
      alert("삭제가 완료되었습니다.");
      router.push("/archive/request");
    } catch {
      alert("삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!request) return;
    
    setIsLoading(true);
    try {
      const response = await updateArchiveRequestStatus(requestId, "APPROVED");
      const updatedRequest = (response as { data?: ArchiveRequestResponseDto })?.data || response;
      setRequest(updatedRequest as ArchiveRequestResponseDto);
      alert("승인되었습니다.");
    } catch {
      alert("승인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!confirm("정말 거절하시겠습니까?")) return;
    
    setIsLoading(true);
    try {
      const response = await updateArchiveRequestStatus(requestId, "REJECTED");
      const updatedRequest = (response as { data?: ArchiveRequestResponseDto })?.data || response;
      setRequest(updatedRequest as ArchiveRequestResponseDto);
      alert("거절되었습니다.");
    } catch {
      alert("거절에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ title: "", description: "", category: "" });
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest, user]);

  return {
    request,
    isLoading,
    isEditing,
    editData,
    setEditData,
    isMentor,
    isAdmin,
    canAccess,
    isAuthor,
    canEdit,
    user,
    handleEdit,
    handleSave,
    handleDelete,
    handleApprove,
    handleReject,
    handleCancelEdit,
    handleBack
  };
}
