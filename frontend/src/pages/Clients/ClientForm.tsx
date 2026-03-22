import type { ReactNode } from "react";
import { Button } from "../../components/ui/Button";
import { Form } from "../../components/ui/Form";
import { Input } from "../../components/ui/Form/Input";
import { api } from "../../constants";
import { queryClient } from "../../constants/reactQuery";
import { ColorInput } from "./ColorInput";
import { ClientSchema } from "./schemas";
import { ClientInputs } from "./types";

interface ClientFormProperties {
  onSuccess: () => void;
  defaultValues: ClientInputs;
  clientId?: string;
}

export function ClientForm({
  onSuccess,
  defaultValues,
  clientId,
}: ClientFormProperties): ReactNode {
  const { mutate: create, isPending: isCreating } =
    api.clients.create.useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["clientsList"] });
        onSuccess();
      },
    });

  const { mutate: update, isPending: isUpdating } =
    api.clients.update.useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["clientsList"] });
        onSuccess();
      },
    });

  return (
    <Form<ClientInputs>
      schema={ClientSchema}
      defaultValues={defaultValues}
      onSubmit={(data) => {
        const body = {
          name: data.fullName,
          color: data.color,
          observations: data.observations,
        };
        if (clientId) {
          update({
            body,
            params: {
              clientId,
            },
          });
        } else {
          create({ body });
        }
      }}
      className="flex flex-col gap-4"
    >
      <Input<ClientInputs>
        name="fullName"
        label="Name"
        placeholder="John Doe"
        required
      />
      <ColorInput />
      <Input<ClientInputs> name="observations" label="Observations" required />
      <div className="flex justify-end">
        <Button
          label="Save"
          type="submit"
          disabled={isCreating || isUpdating}
        />
      </div>
    </Form>
  );
}
