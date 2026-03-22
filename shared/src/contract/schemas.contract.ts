import { s } from "@shared/schemas";

export const errorResponse = s.object({
  error: s.string(),
});
