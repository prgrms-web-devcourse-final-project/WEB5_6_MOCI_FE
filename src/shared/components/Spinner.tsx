import Image from "next/image";

function Spinner() {
  return (
    <div className="root-min-h flex-center flex-col">
      <Image
        src="/user_profile.png"
        width={300}
        height={300}
        className="select-none animate-loading"
        priority
        alt="디딤돌로고"
      ></Image>
      <p className="text-4xl font-bold text-darkgreen-default">
        로딩중
        <span> . </span>
        <span> . </span>
        <span> . </span>
      </p>
    </div>
  );
}

export default Spinner;
