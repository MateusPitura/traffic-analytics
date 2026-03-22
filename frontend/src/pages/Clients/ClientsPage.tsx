import type { ReactNode } from "react";
import { Header } from "../../components/Header";
import { Button } from "../../components/ui/Button";
import { ClientsTable } from "./ClientsTable";

export function ClientsPage(): ReactNode {
  return (
    <div className="flex flex-col gap-4 min-w-0 w-full">
      <Header title="Clients" />
      <Button label="Create client" />
      <ClientsTable />
    </div>
  );
}
