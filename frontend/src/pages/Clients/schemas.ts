import { s } from "@shared/schemas";

export const NewClientSchema = s.object({
  fullName: s.string(),
  color: s.color(),
  observations: s.string().nullable(),
});
