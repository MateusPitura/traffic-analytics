import { useState, type ReactNode } from "react";
import { Header } from "../../components/Header";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { useIsOpen } from "../../hooks/useIsOpen";
import { ClientForm } from "./ClientForm";
import { ClientsTable } from "./ClientsTable";
import { ClientInputs } from "./types";

const defaultValues: ClientInputs = {
  fullName: "",
  color: "",
  observations: "",
};

export function ClientsPage(): ReactNode {
  const newClientModal = useIsOpen();
  const [formDefaultValues, setFormDefaultValues] =
    useState<ClientInputs>(defaultValues);
  const [clientId, setClientId] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col gap-4 min-w-0 w-full">
      <Header title="Clients" />
      <Button
        label="Create client"
        onClick={() => {
          newClientModal.open();
          setFormDefaultValues(defaultValues);
          setClientId(undefined);
        }}
      />
      <ClientsTable
        onEditClient={(clientId, defaultValues) => {
          setClientId(clientId);
          setFormDefaultValues(defaultValues);
          newClientModal.open();
        }}
      />
      <Modal
        isOpen={newClientModal.isOpen}
        onClose={newClientModal.close}
        title={clientId ? "Edit Client" : "New Client"}
      >
        <ClientForm
          onSuccess={newClientModal.close}
          defaultValues={formDefaultValues}
          clientId={clientId}
        />
      </Modal>
    </div>
  );
}
