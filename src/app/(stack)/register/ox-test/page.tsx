import OXQuiz from "./components/OXQuiz";

function page() {
  return (
    <div className="flex-1 w-full overflow-hidden px-10 flex-center flex-col gap-[5vh] scroll-auto">
      <OXQuiz />
    </div>
  );
}

export default page;
