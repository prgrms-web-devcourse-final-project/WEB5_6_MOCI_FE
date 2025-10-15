"use client";

import { ReactNode } from "react";

interface RequestListProps {
  children: ReactNode;
  emptyMessage?: string;
}

function RequestList({ children, emptyMessage = "요청이 없습니다." }: RequestListProps) {
  return (
    <div className="flex flex-col">
      {Array.isArray(children) && children.length === 0 ? (
        <div className="flex-center flex-1 py-20">
          <p className="text-xl text-gray">{emptyMessage}</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
}

export default RequestList;
