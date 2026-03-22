import { contract } from "@shared/contract";
import { initQueryClient } from "@ts-rest/react-query";

export const api = initQueryClient(contract, {
  baseUrl: "http://localhost:3000",
});