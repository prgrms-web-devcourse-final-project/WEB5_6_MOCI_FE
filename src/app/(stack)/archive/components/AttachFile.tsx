import Button from "@/shared/components/Button";
import { useRef } from "react";

function AttachFile() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input ref={fileInputRef} id="fileUpload" type="file" hidden />
      <Button type="button" onClick={handleClick}>
        파일 선택
      </Button>
    </div>
  );
}
export default AttachFile;
