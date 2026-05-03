import { Action } from "@shared/types";
import type { DomainsCollection } from "@shared/types/firestore";
import { BATCH_DELAY } from "./constants";

export function getPresenceEvent(
  sessionId: string,
): DomainsCollection["events"][number] {
  return {
    action: Action.PRESENCE,
    sessionId,
    timestamp: new Date(Date.now() + BATCH_DELAY).toISOString(),
    metadata: "Presence heartbeat",
    url: String(location?.href),
  };
}
