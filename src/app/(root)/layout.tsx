// import SmoothScrollerProvider from "@/provider/SmoothScrollerProvider";
import Header from "@/shared/components/MainHeader";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
        <main className="root-min-h pt-12 m-auto max-w-[650px] min-w-[350px]">
          {children}
        </main>
    </>
  );
}

export default Layout;
