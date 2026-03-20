import { Action } from "@shared/types";
import { collectVisitData } from "./collectVisitData";
import { sendToWorker } from "./sendToWorker";

(async function () {
  const visitData = await collectVisitData();

  sendToWorker(visitData);

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const dataset = target?.dataset?.['analytics']
    if (dataset) {
      sendToWorker({
        action: Action.CLICK,
        localStorageId: visitData.localStorageId,
        timestamp: new Date().toISOString(),
        metadata: dataset
      });
    }
  });
})();
