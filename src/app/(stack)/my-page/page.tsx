import Button from "@/shared/components/Button";

function Page() {
  return (
    <div className="flex-1 p-10 flex-center flex-col gap-8">
      <div className="w-4/5 flex-center flex-col">사용자 정보</div>
      <Button fullWidth>이메일 설정</Button>
      <Button fullWidth>비밀번호 바꾸기</Button>
      <Button fullWidth color="darkgreen">
        회원탈퇴하기
      </Button>
    </div>
  );
}
export default Page;
