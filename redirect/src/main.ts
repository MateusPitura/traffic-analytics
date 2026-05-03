import { collectVisitData } from "@script/collectVisitData";
import { sendToWorker } from "@script/sendToWorker";
import { mapUtmIdToUrl } from "./constants";

const visitData = await collectVisitData();

sendToWorker(visitData);

const params = new URLSearchParams(window.location.search);

let url;

const utmId = params.get("r");
if (utmId) {
  url = mapUtmIdToUrl[utmId];
}

const query = params.get("q");
if (query) {
  url = decodeURIComponent(query);
}

window.location.replace(`https://${url}`);
