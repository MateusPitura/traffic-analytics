import { ClassValue } from "clsx";
import { type ReactElement } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "../../../utils/cn";
import { InputError } from "./InputError";

interface InputProperties<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  required?: boolean;
  autoFocus?: boolean;
  className?: ClassValue;
}

export function Input<T extends FieldValues>({
  label,
  name,
  placeholder,
  type = "text",
  maxLength,
  required,
  autoFocus = false,
  className,
}: InputProperties<T>): ReactElement {
  const { register } = useFormContext();

  return (
    <label className={cn("flex flex-col", className)}>
      <span className="text-sm text-on-surface p-1">{label}</span>
      <div className="border-outline border-2 rounded-md flex items-center gap-1 overflow-hidden h-10">
        <input
          {...register(name)}
          className="text-base text-on-surface bg-transparent p-1 px-2 caret-primary flex-1 outline-none"
          autoComplete={"off"}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          required={required}
          autoFocus={autoFocus}
        />
      </div>
      {<InputError name={name} />}
    </label>
  );
}
