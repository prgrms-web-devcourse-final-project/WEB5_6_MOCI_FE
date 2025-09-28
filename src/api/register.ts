export const register = async (data: {
  name: string;
  phone: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:8080/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      loginType: "PHONE",
      digitalLevelAnswers: [false, false, false, false, false],
      name: data.name,
      email: "",
      userId: data.phone,
      password: data.password,
    }),
  });

  if (!res.ok) {
    throw new Error("회원가입 실패");
  }

  return res.json(); // 성공 시 서버 응답 데이터
};
