const THRESHOLD_SECONDS = 6_000;

export function getOnlineThreshold(): string {
  return new Date(Date.now() - THRESHOLD_SECONDS).toISOString();
}
