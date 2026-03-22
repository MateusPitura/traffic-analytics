import type { ReactNode } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "../../components/ui/Form/Input";
import { ClientInputs } from "./types";

export function ColorInput(): ReactNode {
  const { control } = useFormContext<ClientInputs>();

  const colorWatch = useWatch({
    control,
    name: "color",
  });

  return (
    <div className="flex gap-4 items-center">
      <Input<ClientInputs>
        name="color"
        label="Color"
        placeholder="#ff0000"
        required
        className="flex-1"
      />
      {colorWatch && <div
        className="h-4 w-8 rounded-md"
        style={{
          backgroundColor: colorWatch || "transparent",
        }}
      ></div>}
    </div>
  );
}
