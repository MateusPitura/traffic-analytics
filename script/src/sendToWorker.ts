import type { DomainsCollection } from "@shared/types/firestore";

const ENDPOINT = "https://traffic-analytics.mateuspitura.workers.dev";

export function sendToWorker(data: DomainsCollection['client'] | DomainsCollection['events']): void {
  try {
    navigator.sendBeacon(ENDPOINT, JSON.stringify(data));
  } catch {
    fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(data),
      keepalive: true,
      credentials: "include",
    });
  }
}
