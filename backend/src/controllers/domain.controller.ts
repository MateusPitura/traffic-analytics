import { ServerInferResponses } from "@ts-rest/core";
import { domainService } from "../services/domain.service";
import { contract } from "@shared/contract";

type ListDomainsResponse = ServerInferResponses<typeof contract.domains.list>;

export const listDomains = async (): Promise<ListDomainsResponse> => {
  const domains = await domainService.list();

  return {
    status: 200,
    body: domains,
  };
};
