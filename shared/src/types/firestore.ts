import { Action } from ".";

export interface ClientsCollection {
  name: string;
  color: string;
  observations: string;
  linkedCookieId: string[];
  linkedFingerprint: string[];
  linkedLocalStorageId: string[];
  linkedIp: string[];
  linkedHostname: string[];
}

export interface DomainsCollection {
  clientId: string;
  client: {
    timestamp: string;
    action: Action;
    sessionId: string;
    url: string;
    localStorageId: string;
    referer: string;
    ua: string;
    timezone: string;
    language: string;
    innerWidth: string;
    innerHeight: string;
    outerWidth: string;
    outerHeight: string;
    dpr: string;
    saveData: boolean;
    type: string;
    cookieEnabled: boolean;
    fingerprint: string;
  };
  worker: {
    cookieId: string;
    timestamp: string;
    url: string;
    referer: string;
    ua: string;
    timezone: string;
    language: string;
    latitude: string;
    longitude: string;
    city: string;
    region: string;
    country: string;
    ip: string;
    asOrganization: string;
    score: string;
    verifiedBot: string;
  };
  events: {
    timestamp: string;
    action: Action;
    sessionId: string;
    url: string;
    metadata: string;
  }[];
}
