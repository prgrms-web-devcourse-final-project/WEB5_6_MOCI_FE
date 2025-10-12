import { BASE_URL } from "./constants/config";

//file을 db에 업로드하고, 해당 파일의 url을 받습니다.
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("uploadFile", file);

  const res = await fetch(`${BASE_URL}/api/v1/file`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("이미지 업로드 실패");
  }

  const data = await res.json();

  return {
    id: data.data.id,
    name: data.data.file_name,
    url: `${BASE_URL}/uploads/${data.data.file_url}`,
  };
};
