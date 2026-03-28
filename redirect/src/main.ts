import { collectVisitData } from "@script/collectVisitData";
import { sendToWorker } from "@script/sendToWorker";

const visitData = await collectVisitData();

sendToWorker(visitData);

let rawUrl = window.location.pathname.slice(1);

rawUrl = decodeURIComponent(rawUrl);

if (rawUrl) {
  const search = window.location.search;
  const hash = window.location.hash;

  const target = rawUrl + search + hash;

  window.location.replace(`https://${target}`);
}
