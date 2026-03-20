import { load as fingerprintLoad } from "@fingerprintjs/fingerprintjs";
import { Action, type ClientVisitData } from "@shared/types";

interface Navigator {
  connection?: {
    saveData?: boolean;
    type?: string;
  };
}

const LOCAL_STORAGE_NAME = "traffic_analytics_local_storage_id";

export async function collectVisitData(): Promise<ClientVisitData> {
  let localStorageId = localStorage.getItem(LOCAL_STORAGE_NAME);
  if (!localStorageId) {
    localStorageId = crypto.randomUUID();
    localStorage.setItem(LOCAL_STORAGE_NAME, localStorageId);
  }

  const connection = (navigator as Navigator)?.connection;

  const fingerprintClient = await fingerprintLoad();
  const fingerprint = await fingerprintClient.get();

  return {
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
    action: Action.VISIT,
  };
}
