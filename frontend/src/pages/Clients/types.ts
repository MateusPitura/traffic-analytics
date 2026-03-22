import { s } from "@shared/schemas";
import { ClientSchema } from "./schemas";

export type ClientInputs = s.infer<typeof ClientSchema>;
