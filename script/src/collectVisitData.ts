import { load as fingerprintLoad } from "@fingerprintjs/fingerprintjs";
import { Action } from "@shared/types";
import type { DomainsCollection } from "@shared/types/firestore";

interface Navigator {
  connection?: {
    saveData?: boolean;
    type?: string;
  };
}

const LOCAL_STORAGE_NAME = "traffic_analytics_local_storage_id";

export async function collectVisitData(): Promise<DomainsCollection['client']> {
  let localStorageId = localStorage.getItem(LOCAL_STORAGE_NAME);
  if (!localStorageId) {
    localStorageId = crypto.randomUUID();
    localStorage.setItem(LOCAL_STORAGE_NAME, localStorageId);
  }

  const connection = (navigator as Navigator)?.connection;

  const fingerprintClient = await fingerprintLoad();
  const fingerprint = await fingerprintClient.get();

  return {
    ua: String(navigator?.userAgent),
    referer: String(document?.referrer),
    url: String(location?.href),
    timestamp: String(new Date().toISOString()),
    timezone: String(Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone),
    innerWidth: String(window?.innerWidth),
    innerHeight: String(window?.innerHeight),
    outerWidth: String(window?.outerWidth),
    outerHeight: String(window?.outerHeight),
    dpr: String(window?.devicePixelRatio),
    saveData: String(!!connection?.saveData),
    networkType: String(connection?.type),
    language: String(navigator?.language),
    cookieEnabled: String(!!navigator?.cookieEnabled),
    fingerprint: String(fingerprint.visitorId),
    localStorageId,
    action: Action.VISIT,
    sessionId: crypto.randomUUID()
  };
}
