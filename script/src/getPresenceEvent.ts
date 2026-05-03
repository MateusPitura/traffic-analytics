import { Action } from "@shared/types";
import type { DomainsCollection } from "@shared/types/firestore";

export function getPresenceEvent(
  sessionId: string,
): DomainsCollection["events"][number] {
  return {
    action: Action.PRESENCE,
    sessionId,
    timestamp: new Date().toISOString(),
    metadata: "Presence heartbeat",
    url: String(location?.href),
  };
}
