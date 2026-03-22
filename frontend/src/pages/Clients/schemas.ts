import { s } from "@shared/schemas";

export const ClientSchema = s.object({
  fullName: s.string(),
  color: s.color(),
  observations: s.string().or(s.empty()),
});
