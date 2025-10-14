import Image from "next/image";
import Link from "next/link";
interface CardUIType {
  id: number;
  imgsrc: string | null;
  title: string;
  category: string;
  createdAt: string;
}
function ArchiveCard({
  cardInfo: { id, imgsrc, title, category, createdAt },
}: {
  cardInfo: CardUIType;
}) {
  return (
    <li>
      <Link
        href={`/archive/post/${id}`}
        className="relative bg-lightgreen rounded-lg w-full min-w-75 p-5 flex flex-col gap-3 
    hover:ring-4 hover:ring-green-default hover:shadow-xl hover:shadow-darkgray "
      >
        <div
          className={`bg-white rounded-lg overflow-clip aspect-[5/4] max-h-80 ${
            imgsrc ? "" : " flex-center"
          }`}
        >
          <Image
            src={imgsrc ?? "/logo.png"}
            width={150}
            height={120}
            alt="아카이브이미지"
            style={
              imgsrc
                ? { width: "100%", height: "auto", overflow: "hidden" }
                : { width: "auto", height: "auto", overflow: "hidden" }
            }
            priority={imgsrc ? false : true}
            fetchPriority="high"
          ></Image>
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-xl">{category}</p>
        <p className="absolute bottom-5 right-5">{createdAt}</p>
      </Link>
    </li>
  );
}

export default ArchiveCard;
