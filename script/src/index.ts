import { load as fingerprintLoad } from "@fingerprintjs/fingerprintjs";
import { Actions, type ClientData } from "@shared/types";

interface Navigator {
  connection?: {
    saveData?: boolean;
    type?: string;
  };
}

(async function () {
  const ENDPOINT = "https://traffic-analytics.mateuspitura.workers.dev";

  let localStorageId = localStorage.getItem(
    "traffic_analytics_local_storage_id"
  );
  if (!localStorageId) {
    localStorageId = crypto.randomUUID();
    localStorage.setItem("traffic_analytics_local_storage_id", localStorageId);
  }

  const fingerprintClient = await fingerprintLoad();
  const fingerprint = await fingerprintClient.get();

  const connection = (navigator as Navigator)?.connection;

  const data: ClientData = {
    ua: navigator?.userAgent ?? null,
    referer: document?.referrer ?? null,
    url: location?.href ?? null,
    timestamp: new Date()?.toISOString() ?? null,
    timezone: Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone,
    innerWidth: window?.innerWidth ?? null,
    innerHeight: window?.innerHeight ?? null,
    outerWidth: window?.outerWidth ?? null,
    outerHeight: window?.outerHeight ?? null,
    dpr: window?.devicePixelRatio ?? null,
    saveData: connection?.saveData ?? null,
    type: connection?.type ?? null,
    language: navigator?.language,
    cookieEnabled: navigator?.cookieEnabled,
    fingerprint: fingerprint.visitorId,
    localStorageId,
    action: Actions.VISIT,
  };

  try {
    navigator.sendBeacon(ENDPOINT, JSON.stringify(data)); // 🌠 maybe keep only one
  } catch {
    fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(data),
      keepalive: true,
      credentials: "include",
    });
  }
})();
