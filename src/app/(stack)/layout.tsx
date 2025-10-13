import StackHeader from "@/shared/components/StackHeader";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StackHeader />
      <main className="root-min-h h-dvh flex flex-col flex-1">{children}</main>
    </>
  );
}

export default Layout;
