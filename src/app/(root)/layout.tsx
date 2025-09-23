import Header from "@/shared/components/MainHeader";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="root-min-h">{children}</main>
    </div>
  );
}

export default Layout;
