import { Action } from "@shared/types";
import type { DomainsCollection } from "@shared/types/firestore";
import { BATCH_DELAY } from "./constants";
import { getPresenceEvent } from "./getPresenceEvent";
import { sendToWorker } from "./sendToWorker";

interface HandleEventsProperties {
  sessionId: string;
}

let eventQueue: DomainsCollection["events"] = [];

function flushEvents(sessionId: string) {
  sendToWorker(eventQueue);

  eventQueue = [getPresenceEvent(sessionId)];
}

function addEvent(metadata: string, sessionId: string) {
  eventQueue.push({
    action: Action.CLICK,
    sessionId,
    timestamp: new Date().toISOString(),
    metadata,
    url: String(location?.href),
  });
}

export function handleEvents({ sessionId }: HandleEventsProperties): void {
  eventQueue = [getPresenceEvent(sessionId)];
  window.setInterval(() => flushEvents(sessionId), BATCH_DELAY);

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const dataset = target?.dataset?.["analytics"];

    if (!dataset) return;

    addEvent(dataset, sessionId);
  });

  window.analytics = {
    addEvent: (metadata: string) => addEvent(metadata, sessionId),
  };
}
