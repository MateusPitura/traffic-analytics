import { collectVisitData } from "./collectVisitData";
import { handleEvents } from "./handleEvents";
import { sendToWorker } from "./sendToWorker";

(async function () {
  const visitData = await collectVisitData();

  sendToWorker(visitData);

  handleEvents({ sessionId: visitData.sessionId });
})();
