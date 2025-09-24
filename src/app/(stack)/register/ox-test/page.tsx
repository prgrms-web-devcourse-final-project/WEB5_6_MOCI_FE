import OXQuiz from "./components/OXQuiz";

function page() {
  return (
    <div className="w-full root-min-h overflow-hidden px-10 flex flex-col justify-center items-center gap-[5vh] scroll-auto">
      <OXQuiz />
    </div>
  );
}

export default page;
