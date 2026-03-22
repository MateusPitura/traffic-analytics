import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container } from "./Container";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
     <Container/>
    </QueryClientProvider>
  );
}
