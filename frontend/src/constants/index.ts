import { contract } from "@shared/contract";
import { QueryClient } from "@tanstack/react-query";
import { initQueryClient } from "@ts-rest/react-query";

export const api = initQueryClient(contract, {
  baseUrl: "http://localhost:3000",
});

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