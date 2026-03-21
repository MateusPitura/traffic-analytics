import { Action, type ClientEventData } from "@shared/types";
import { sendToWorker } from "./sendToWorker";

interface HandleEventsProperties {
  sessionId: string;
}

const CLICK_BATCH_DELAY = 3_000;

let eventQueue: ClientEventData[] = [];
let flushTimeout: number | null = null;

function flushEvents() {
  if (eventQueue.length === 0) return;

  sendToWorker(eventQueue);

  eventQueue = [];
  flushTimeout = null;
}

export function handleEvents({ sessionId }: HandleEventsProperties): void {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const dataset = target?.dataset?.["analytics"];

    if (!dataset) return;

    eventQueue.push({
      action: Action.CLICK,
      sessionId,
      timestamp: new Date().toISOString(),
      metadata: dataset,
    });

    if (!flushTimeout) {
      flushTimeout = window.setTimeout(flushEvents, CLICK_BATCH_DELAY);
    }
  });
}
