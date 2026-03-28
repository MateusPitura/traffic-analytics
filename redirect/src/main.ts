import { collectVisitData } from "@script/collectVisitData";
import { sendToWorker } from "@script/sendToWorker";

const visitData = await collectVisitData();

sendToWorker(visitData);

const params = new URLSearchParams(window.location.search);

let rawUrl = params.get("q");

if (rawUrl) {
  rawUrl = decodeURIComponent(rawUrl);

  window.location.replace(`https://${rawUrl}`);
}
