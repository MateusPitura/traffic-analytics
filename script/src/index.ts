import { Action, type ClientEventData } from "@shared/types";
import { collectVisitData } from "./collectVisitData";
import { sendToWorker } from "./sendToWorker";

const CLICK_BATCH_DELAY = 10_000;

let eventQueue: ClientEventData[] = [];
let flushTimeout: number | null = null;

function flushEvents() {
  if (eventQueue.length === 0) return;

  sendToWorker(eventQueue);

  eventQueue = [];
  flushTimeout = null;
}

(async function () {
  const visitData = await collectVisitData();

  sendToWorker(visitData);

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const dataset = target?.dataset?.["analytics"];

    if (!dataset) return;

    eventQueue.push({
      action: Action.CLICK,
      localStorageId: visitData.localStorageId,
      timestamp: new Date().toISOString(),
      metadata: dataset,
    });

    if (!flushTimeout) {
      flushTimeout = window.setTimeout(flushEvents, CLICK_BATCH_DELAY);
    }
  });
})();
