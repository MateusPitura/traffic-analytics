import { s } from "@shared/schemas";
import { NewClientSchema } from "./schemas";

export type NewClientInputs = s.infer<typeof NewClientSchema>;
