export const login = async (formInput: {
  userId: string;
  password: string;
}) => {
  formInput.userId = formInput.userId.replace(/-/g, ""); // 하이픈 제거

  try {
    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset: UTF-8",
      },
      credentials: "include",
      body: JSON.stringify({ ...formInput, loginType: "PHONE" }),
    });

    if (!res.ok) {
      try {
        const errorData = await res.json();
        throw new Error(errorData.message ?? "로그인에 실패하였습니다");
      } catch {
        throw new Error("로그인에 실패하였습니다");
      }
    }

    const data = await res.json();
    return data.data.user;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("로그인에 실패하였습니다");
  }
};
