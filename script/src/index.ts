import { collectVisitData } from "./collectVisitData";
import { handleEvents } from "./handleEvents";
import { sendToWorker } from "./sendToWorker";

(async function () {
  if(location?.href?.includes("localhost")) return;

  const visitData = await collectVisitData();

  sendToWorker(visitData);

  handleEvents({ sessionId: visitData.sessionId });
})();
