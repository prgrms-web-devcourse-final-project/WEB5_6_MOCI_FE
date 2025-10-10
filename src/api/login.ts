export const login = async (formInput: {
  userId: string;
  password: string;
}) => {
  formInput.userId = formInput.userId.replace(/-/g, ""); // 하이픈 제거

  console.log("로그인 시도 - userId:", formInput.userId, "password:", formInput.password);

  try {
    const requestBody = { ...formInput, loginType: "PHONE" };
    console.log("로그인 요청 데이터:", requestBody);
    
    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset: UTF-8",
      },
      credentials: "include",
      body: JSON.stringify(requestBody),
    });

    console.log("로그인 응답 상태:", res.status, res.statusText);

    if (!res.ok) {
      try {
        const errorData = await res.json();
        console.error("로그인 에러 응답:", errorData);
        throw new Error(errorData.message ?? "로그인에 실패하였습니다");
      } catch {
        console.error("로그인 응답 파싱 실패");
        throw new Error("로그인에 실패하였습니다");
      }
    }

    const data = await res.json();
    console.log("로그인 성공 - 응답 데이터:", data);
    return data.data.user;
  } catch (e: unknown) {
    console.error("로그인 API 호출 실패:", e);
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw new Error("로그인에 실패하였습니다");
  }
};
