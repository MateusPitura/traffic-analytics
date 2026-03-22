import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn
} from "react-hook-form";
import { ZodType } from "zod";

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
    schema: ZodType;
  className?: string;
  onlyDirty?: boolean;
}

type Field = Record<string, unknown>;

function getDirtyValues(dirtyFields: Field | boolean, allValues: Field): Field {
  if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues;
  return Object.fromEntries(
    Object.keys(dirtyFields)
      .filter((key) => (dirtyFields as Field)[key] !== false)
      .map((key) => [
        key,
        getDirtyValues(
          (dirtyFields as Field)[key] as Field,
          allValues[key] as Field
        ),
      ])
  );
}

export function Form<T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  schema,
  className,
  onlyDirty,
}: FormProps<T>): ReactNode {
  const methods: UseFormReturn<T> = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  function handleSubmit(data: Record<string, unknown>) {
    if (onlyDirty) {
      onSubmit(getDirtyValues(methods.formState.dirtyFields, data) as T);
    } else {
      onSubmit(data as T);
    }
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        noValidate
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
}
