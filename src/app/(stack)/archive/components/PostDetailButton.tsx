"use client";

import { useAuthStore } from "@/store/authStore";
import Back from "./Back";
import Edit from "./Edit";
import Delete from "./Delete";

function PostDetailButton() {
  const { user } = useAuthStore();

  if (user?.role === "ADMIN") {
    return (
      <div className="flex-center gap-5">
        <Edit />
        <Back />
        <Delete />
      </div>
    );
  } else {
    return <Back />;
  }
}
export default PostDetailButton;
