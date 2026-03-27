import { s } from "../schemas";

export const errorResponse = s.object({
  error: s.string(),
});
