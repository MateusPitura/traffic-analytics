import { get } from "lodash";
import type { ReactNode } from "react";
import { useFormState } from "react-hook-form";
import { cn } from "../../../utils/cn";

interface InputErrorProperties {
  name: string;
}

export function InputError({
  name,
}: InputErrorProperties): ReactNode {
  const { errors } = useFormState({
    name,
  });

  const errorsFormatted = get(errors, name);

  return (
    <span
      className={cn("text-sm text-error px-1 py-px h-6!", {
        invisible: !errorsFormatted,
      })}
    >
      {errorsFormatted?.message?.toString() ?? "Invalid field"}
    </span>
  );
}
