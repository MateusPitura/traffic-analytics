import { ServerInferRequest, ServerInferResponses } from "@ts-rest/core";
import { analyticsService } from "../services/analytics.service";
import { contract } from "@shared/contract";

type ListAnalyticsResponse = ServerInferResponses<
  typeof contract.analytics.list
>;
type ListAnalyticsRequest = ServerInferRequest<typeof contract.analytics.list>;

export const listAnalytics = async ({
  query,
}: ListAnalyticsRequest): Promise<ListAnalyticsResponse> => {
  const { domain, cursor, clientId } = query;

  const result = await analyticsService.list(domain, cursor, clientId);

  return {
    status: 200,
    body: result,
  };
};

type DeleteAnalyticsResponse = ServerInferResponses<
  typeof contract.analytics.delete
>;
type DeleteAnalyticsRequest = ServerInferRequest<
  typeof contract.analytics.delete
>;

export const deleteAnalytics = async ({
  body,
}: DeleteAnalyticsRequest): Promise<DeleteAnalyticsResponse> => {
  const { analyticIds, domain } = body;

  const result = await analyticsService.removeMany(domain, analyticIds);

  return {
    status: 200,
    body: result,
  };
};

type LinkToClientAnalyticsResponse = ServerInferResponses<
  typeof contract.analytics.linkToClient
>;
type LinkToClientAnalyticsRequest = ServerInferRequest<
  typeof contract.analytics.linkToClient
>;

export const linkToClientAnalytics = async ({
  body,
}: LinkToClientAnalyticsRequest): Promise<LinkToClientAnalyticsResponse> => {
  try {
    const { domain, analyticId, clientId } = body;

    const result = await analyticsService.linkToClient(
      domain,
      analyticId,
      clientId
    );

    return {
      status: 200,
      body: result,
    };
  } catch (error: any) {
    if (error.message === "Document not found") {
      return {
        status: 404,
        body: { error: error.message },
      };
    }
    throw error;
  }
};
