import { getArchive } from "@/api/getArchive";
import Back from "../../components/Back";

async function page({ params }: { params: Promise<{ id: number }> }) {
  const param = await params;
  const id = param.id;
  const { title, createdAt, description } = await getArchive(id);

  return (
    <div className="flex-1 flex flex-col gap-2 py-10 px-5">
      <h2 className="text-3xl  font-bold px-3 py-2 break-keep">{title}</h2>
      <p className="text-xl px-3 py-2 text-darkgray">
        작성일 : {createdAt.slice(0, 10)}
      </p>
      <p className="text-xl px-3 py-2 overflow-y-auto flex-1 break-keep">
        {description}
      </p>
      <Back />
    </div>
  );
}

export default page;
