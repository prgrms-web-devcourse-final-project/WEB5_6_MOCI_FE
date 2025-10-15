"use client";

import { QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

function QueryProvider({ children }: { children: React.ReactNode }) {
  return <div>QueryProvider</div>;
}
export default QueryProvider;
