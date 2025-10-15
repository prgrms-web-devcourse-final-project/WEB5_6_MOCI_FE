import { BASE_URL } from "./constants/config";

export const changePW = async ({
  currentPassword,
  newPassword,
  confirmPassword: newPasswordConfirm,
}: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/users/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        currentPassword,
        newPassword,
        newPasswordConfirm,
      }),
    });

    if (!res.ok) {
      let message = "비밀번호 변경에 실패하였습니다";
      try {
        const errorData = await res.json();
        if (errorData.message) message = errorData.message;
      } catch {}
      throw new Error(message);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("비밀번호 변경에 실패하였습니다");
  }
};
