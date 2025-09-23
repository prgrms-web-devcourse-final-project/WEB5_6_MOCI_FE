import StackHeader from "@/shared/components/StackHeader";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <StackHeader />
      <main className="root-min-h">{children}</main>
    </div>
  );
}

export default Layout;
