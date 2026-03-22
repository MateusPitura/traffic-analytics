import { z } from "zod";

export type infer<T extends z.ZodTypeAny> = z.infer<T>;

export function object<T extends z.ZodRawShape>(shape: T) {
  return z.object(shape).strict();
}

interface StringProps {
  maxChars?: number;
}

export function string({ maxChars = 128 }: StringProps = {}) {
  return z
    .string({ required_error: "Required" })
    .max(maxChars, { message: `Exceeded limit of ${maxChars}` })
    .nonempty({ message: "Required" });
}

interface ArrayProps {
  minItems?: number;
}

export function array<T extends z.ZodTypeAny>(
  schema: T,
  { minItems }: ArrayProps = {}
) {
  const base = z.array(schema);
  if (minItems) {
    return base.min(minItems, { message: `Must have at least ${minItems}` });
  }
  return base;
}

export function color() {
  return string({ maxChars: 7 }).regex(/^#[0-9A-Fa-f]{6}$/, {
    message: "Invalid color format, expected hex code",
  });
}

export function enumeration<T extends string>(values: readonly T[]) {
  return z.enum(values as [T, ...T[]], { message: "Invalid option" });
}
export function number() {
  return z.coerce
    .number({
      required_error: "Required",
      message: "Invalid number",
    })
    .int({ message: "Invalid number" });
}

export const boolean = z.boolean;

export const empty = () => z.literal("");