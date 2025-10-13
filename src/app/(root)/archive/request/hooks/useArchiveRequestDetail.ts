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
  const isAuthor = request && isMentor && user?.id === request.requester.id;
  const canEdit = request && (request.status === "PENDING" || request.status === "REJECTED");

  const fetchRequest = useCallback(async () => {
    try {
      const response = await getArchiveRequest(requestId);
      setRequest(response);
    } catch (error) {
      console.error("요청 상세 정보 로딩 실패:", error);
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
      setRequest(response);
      setIsEditing(false);
      alert("수정이 완료되었습니다.");
    } catch (error) {
      console.error("수정 실패:", error);
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
    } catch (error) {
      console.error("삭제 실패:", error);
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
      setRequest(response);
      alert("승인되었습니다.");
    } catch (error) {
      console.error("승인 실패:", error);
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
      setRequest(response);
      alert("거절되었습니다.");
    } catch (error) {
      console.error("거절 실패:", error);
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
