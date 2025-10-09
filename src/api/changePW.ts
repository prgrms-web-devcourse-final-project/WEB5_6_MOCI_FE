export const changePW = async (newPW: string, confirmNewPW: string) => {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        newPassword: newPW,
        newPasswordConfirm: confirmNewPW,
      }),
    });

    if (!res.ok) {
      try {
        const errorData = await res.json();
        throw new Error(errorData.message ?? "비밀번호 변경에 실패하였습니다");
      } catch {
        throw new Error("비밀번호 변경에 실패하였습니다");
      }
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("비밀번호 변경에 실패하였습니다");
  }
};
