import { DomainsCollection } from "@shared/types/firestore";

export interface ListAnalyticsOutDto {
    payload: DomainsCollection[]
    nextCursor: number | null;
    hasMore: boolean;
}

export interface RemoveManyAnalyticsOutDto {
    deleted: number;
}

export interface LinkToClientOutDto {
    linked: boolean;
}