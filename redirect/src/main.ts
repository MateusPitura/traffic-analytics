import { collectVisitData } from "@script/collectVisitData";
import { sendToWorker } from "@script/sendToWorker";
import { mapUtmIdToUrl } from "./constants";

const visitData = await collectVisitData();

sendToWorker(visitData);

const params = new URLSearchParams(window.location.search);

const utmId = params.get("r");

if (utmId) {
  const url = mapUtmIdToUrl[utmId];

  if (url) {
    window.location.replace(`https://${url}`);
  }
}

let rawUrl = params.get("q");

if (rawUrl) {
  rawUrl = decodeURIComponent(rawUrl);

  window.location.replace(`https://${rawUrl}`);
}
