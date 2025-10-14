import { BASE_URL } from "./constants/config";
import imageCompression from "browser-image-compression";

interface UploadedFile {
  id: number;
  name: string;
  url: string;
  fileUrl: string;
}
//file을 db에 업로드하고, 해당 파일의 url을 받습니다.
export const uploadFile = async (file: File): Promise<UploadedFile> => {
  const MAX_SIZE_MB = 5;
  const isImage = file.type.startsWith("image/");
  const fileSizeMB = file.size / 1024 / 1024;

  let uploadTarget: File = file;

  if (fileSizeMB > MAX_SIZE_MB) {
    if (isImage) {
      try {
        uploadTarget = await imageCompression(file, {
          maxSizeMB: MAX_SIZE_MB,
          maxWidthOrHeight: 1080,
          useWebWorker: true,
        });
      } catch (error) {
        console.error("이미지 압축 중 오류:", error);
        alert("이미지 리사이징 중 오류가 발생했습니다.");
        throw error;
      }
    } else {
      alert(`${file.name}은(는) 5MB를 초과하여 업로드할 수 없습니다.`);
      throw new Error("5MB 초과 비이미지 파일 업로드 불가");
    }
  }

  const formData = new FormData();
  formData.append("uploadFile", uploadTarget);

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
    fileUrl: data.data.file_url,
  };
};
