import { QueryClient } from "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    queryKey: ['domainsList' | 'analyticsList' | 'clientsList', ...ReadonlyArray<unknown>];
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      gcTime: Infinity,
      staleTime: Infinity,
    }
  }
});