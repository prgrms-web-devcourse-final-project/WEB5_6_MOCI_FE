export const login = async (formInput: {
  userId: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:8080/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      charset: "UTF-8",
    },
    credentials: "include",
    body: JSON.stringify({ ...formInput, loginType: "PHONE", socialId: "" }),
  });

  if (!res.ok) {
    throw new Error("로그인 실패");
  }
  const data = await res.json();

  return data;
};
