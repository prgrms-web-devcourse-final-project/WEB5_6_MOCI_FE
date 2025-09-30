import Button from "@/shared/components/Button";
import ArchiveRequest from "../components/ArchiveRequest";

function page() {
  const matchCategory = {
    kakaotalk: "카카오톡",
    ktx: "교통",
    youtube: "유튜브",
    coupang: "쿠팡",
    delivery: "배달",
    bus: "버스",
    all: "전체자료",
  } as const;
  // TODO : 아카이브 페이지 풀 받고 아카이브페이지에 있는거 export 해서 가져오기
  return (
    <div className="flex-1 flex flex-col gap-2 p-5">
      <h1 className="text-3xl text-darkgreen-default font-bold">
        자료요청게시판
      </h1>
      <div className="flex items-center justify-between">
        <select
          name="category"
          id="category"
          className="w-2/3 max-w-60  text-xl border border-gray rounded-lg p-3"
        >
          {Object.entries(matchCategory).map(([key, category]) => (
            <option key={key} value={key}>
              {category}
            </option>
          ))}
        </select>
        <Button>요청하기</Button>
      </div>
      <ul>
        <ArchiveRequest />
      </ul>
    </div>
  );
}

export default page;
