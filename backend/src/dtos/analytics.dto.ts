import { DomainsCollection } from "../../../shared/src/types/firestore";

export interface ListAnalyticsOutDto {
    payload: (DomainsCollection & { analyticId: string })[]
    nextCursor: string | null;
    hasMore: boolean;
}

export interface RemoveManyAnalyticsOutDto {
    deleted: number;
}

export interface LinkToClientOutDto {
    linked: boolean;
}