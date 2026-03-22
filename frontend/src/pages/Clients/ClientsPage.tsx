import type { ReactNode } from "react";
import { Header } from "../../components/Header";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { useIsOpen } from "../../hooks/useIsOpen";
import { ClientsTable } from "./ClientsTable";
import { NewClientForm } from "./NewClientForm";

export function ClientsPage(): ReactNode {
  const newClientModal = useIsOpen();

  return (
    <div className="flex flex-col gap-4 min-w-0 w-full">
      <Header title="Clients" />
      <Button label="Create client" onClick={newClientModal.open} />
      <ClientsTable />
      <Modal
        isOpen={newClientModal.isOpen}
        onClose={newClientModal.close}
        title="New Client"
      >
        <NewClientForm
          onSuccess={newClientModal.close}
        />
      </Modal>
    </div>
  );
}
