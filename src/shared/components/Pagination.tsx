import Link from "next/link";
import Back from "@/assets/icons/leftArrow.svg";

interface PagenationType {
  totalPages: number;
  currentPage: number;
}
function Pagination({ totalPages, currentPage }: PagenationType) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex gap-2">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`}>
          <Back />
        </Link>
      )}
    </div>
  );
}

export default Pagination;
