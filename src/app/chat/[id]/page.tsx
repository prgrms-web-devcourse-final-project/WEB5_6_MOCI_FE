"use client";
import StackHeader from "@/shared/components/StackHeader";
import { usePathname } from "next/navigation";

function Page() {
  const pathName = usePathname();

  return (
    <>
      <StackHeader pageTitle={pathName} />
      <div>chat room</div>
    </>
  );
}
export default Page;
