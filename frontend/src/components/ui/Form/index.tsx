import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  schema: ZodType;
  className?: string;
}

export function Form<T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  schema,
  className,
}: FormProps<T>): ReactNode {
  const methods: UseFormReturn<T> = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
}
