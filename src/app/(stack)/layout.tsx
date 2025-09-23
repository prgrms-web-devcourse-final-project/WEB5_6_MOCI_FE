import StackHeader from "@/components/StackHeader";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <StackHeader />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
