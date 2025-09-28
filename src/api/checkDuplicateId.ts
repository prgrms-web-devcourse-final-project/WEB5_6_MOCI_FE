export const checkDuplicateId = async (phone: string) => {
  const res = await fetch(`http://localhost:8080/api/v1/users/${phone}`, {
    method: "GET",
  });
  if (res.status === 200) {
    return "EXISTS";
  }
  if (res.status === 404) {
    return "NOT_FOUND";
  }
  throw new Error("전화번호 중복 확인 실패");
};
