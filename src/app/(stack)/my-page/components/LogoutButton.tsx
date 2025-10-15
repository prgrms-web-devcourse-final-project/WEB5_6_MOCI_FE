"use client";
import Button from "@/shared/components/Button";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();
  const { logout, isLoggingOut, setIsLoggingOut } = useAuthStore();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      alert("로그아웃이 완료되었습니다.");
      router.replace("/");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <Button
      fullWidth
      color="yellow"
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "처리중..." : "로그아웃 하기"}
    </Button>
  );
}
export default LogoutButton;
