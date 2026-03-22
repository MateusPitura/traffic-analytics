import type { ReactNode } from "react";
import { Button } from "../../components/ui/Button";
import { Form } from "../../components/ui/Form";
import { Input } from "../../components/ui/Form/Input";
import { api } from "../../constants";
import { queryClient } from "../../constants/reactQuery";
import { ColorInput } from "./ColorInput";
import { NewClientSchema } from "./schemas";
import { NewClientInputs } from "./types";

interface NewClientFormProperties {
  onSuccess: () => void;
}

export function NewClientForm({
  onSuccess,
}: NewClientFormProperties): ReactNode {
  const { mutate, isPending } = api.clients.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientsList"] });
      onSuccess();
    },
  });

  return (
    <Form<NewClientInputs>
      schema={NewClientSchema}
      defaultValues={{
        color: "",
        fullName: "",
        observations: null,
      }}
      onSubmit={(data) => {
        mutate({
          body: {
            name: data.fullName,
            color: data.color,
            observations: data.observations,
          },
        });
      }}
      className="flex flex-col gap-4"
    >
      <Input<NewClientInputs>
        name="fullName"
        label="Name"
        placeholder="John Doe"
        required
      />
      <ColorInput />
      <Input<NewClientInputs>
        name="observations"
        label="Observations"
        required
      />
      <div className="flex justify-end">
        <Button label="Save" type="submit" disabled={isPending} />
      </div>
    </Form>
  );
}
