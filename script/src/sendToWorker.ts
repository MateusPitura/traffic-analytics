import type { ClientEventData, ClientVisitData } from "@shared/types";

const ENDPOINT = "https://traffic-analytics.mateuspitura.workers.dev";

export function sendToWorker(data: ClientVisitData | ClientEventData[]): void {
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
}
