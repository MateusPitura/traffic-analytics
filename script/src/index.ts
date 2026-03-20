import { Action } from "@shared/types";
import { collectVisitData } from "./collectVisitData";
import { sendToWorker } from "./sendToWorker";

(async function () {
  const visitData = await collectVisitData();

  sendToWorker(visitData);

  document.addEventListener("click", (e) => {
    console.log('🌠 e: ', e);
    const target = e.target as HTMLElement;
    if (target?.dataset?.['traffic-analytics']) {
      console.log('🌠 sent to work');
      sendToWorker({
        action: Action.CLICK,
        localStorageId: visitData.localStorageId,
        timestamp: new Date().toISOString(),
        metadata: target.dataset['traffic-analytics'], // 🌠 get value data-set value
      });
    }
  });
})();
