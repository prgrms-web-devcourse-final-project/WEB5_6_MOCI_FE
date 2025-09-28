import Link from "next/link";
import Back from "@/assets/icons/leftArrow.svg";
import Front from "@/assets/icons/rightArrow_.svg";

interface PagenationType {
  totalPages: number;
  currentPage: number;
}
function Pagination({ totalPages, currentPage }: PagenationType) {
  const totalPageGroup = Math.ceil(totalPages / 5);
  const currentGroup = Math.ceil(currentPage / 5);

  const startPage = (currentGroup - 1) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex-center gap-2 p-5">
      {currentGroup > 1 && (
        <Link
          href={`?page=${startPage - 1}`}
          className="mr-2 flex-center hover:scale-125"
        >
          <Back />
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={`w-10 h-10 flex-center rounded-full text-lg  ${
            page === currentPage ? "text-white bg-green-default" : ""
          } font-bold`}
        >
          {page}
        </Link>
      ))}
      {currentGroup < totalPageGroup && (
        <Link
          href={`?page=${endPage + 1}`}
          className="pl-2 flex-center hover:scale-125"
        >
          <Front />
        </Link>
      )}
    </div>
  );
}

export default Pagination;
