import Button from "@/shared/components/Button";
import { useParams, useRouter } from "next/navigation";

function Edit() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);

  const handleEdit = () => {
    router.push(`/archive/post/edit/${postId}`);
  };
  return (
    <>
      <Button className="self-center" color="yellow" onClick={handleEdit}>
        수정
      </Button>
    </>
  );
}
export default Edit;
