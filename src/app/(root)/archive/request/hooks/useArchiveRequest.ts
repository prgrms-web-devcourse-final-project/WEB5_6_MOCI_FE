import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { 
  ArchiveRequestListItem, 
  ArchiveRequestListResponseDto,
  ArchiveRequestListApiResponse,
  RequestStatus 
} from "@/types/archiveRequest";
import { getArchiveRequestList } from "@/api/archiveRequest";

export function useArchiveRequestList() {
  const user = useAuthStore((s) => s.user);
  const [requests, setRequests] = useState<ArchiveRequestListItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const isAdmin = user?.role === "ADMIN";
  const isMentor = user?.role === "MENTOR";
  const canAccess = isAdmin || isMentor;

  const fetchRequests = useCallback(async (page: number = 0, category?: string) => {
    if (!canAccess) return;
    
    const filterCategory = category || selectedCategory;
    setIsLoading(true);
    try {
      const response = await getArchiveRequestList(page, 10, filterCategory);
      
      const requests = (response as any)?.data?.requests || (response as any)?.requests || [];
      const currentPage = (response as any)?.data?.currentPage || (response as any)?.currentPage || 0;
      const totalPages = (response as any)?.data?.totalPages || (response as any)?.totalPages || 0;
      const totalElements = (response as any)?.data?.totalElements || (response as any)?.totalElements || 0;
      
      setRequests(Array.isArray(requests) ? requests : []);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } catch (error) {
      console.error("요청 목록 로딩 실패:", error);
      alert("요청 목록을 불러오는데 실패했습니다.");
      setRequests([]);
      setCurrentPage(0);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setIsLoading(false);
    }
  }, [canAccess, selectedCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0);
    fetchRequests(0, category);
  }, [fetchRequests]);

  // 초기 로딩
  useEffect(() => {
    if (canAccess && user) {
      fetchRequests();
    }
  }, [canAccess, user, fetchRequests]);

  return {
    requests,
    selectedCategory,
    isLoading,
    currentPage,
    totalPages,
    totalElements,
    canAccess,
    isMentor,
    user,
    handleCategoryChange,
    fetchRequests
  };
}
