import { contract } from "@shared/contract";
import { initQueryClient } from "@ts-rest/react-query";

export const BASE_URL = "http://localhost:8592";

export const api = initQueryClient(contract, {
  baseUrl: BASE_URL,
});
