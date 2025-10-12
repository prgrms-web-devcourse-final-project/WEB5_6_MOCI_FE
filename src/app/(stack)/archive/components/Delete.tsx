import { deletePost } from "@/api/deletePost";
import Button from "@/shared/components/Button";
import { useParams, useRouter } from "next/navigation";

function Delete() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);

  const handleDelete = async () => {
    if (!postId) return;
    const ok = confirm("정말 이 게시물을 삭제하시겠습니까?");
    if (!ok) return;

    await deletePost(postId);
    alert("삭제되었습니다!");
    router.replace("/archive");
  };

  return (
    <>
      <Button
        className="self-center bg-red-700 hover:bg-red-800 hover:border-red-900 active:bg-red-800 active:border-red-900"
        onClick={handleDelete}
      >
        삭제
      </Button>
    </>
  );
}
export default Delete;
