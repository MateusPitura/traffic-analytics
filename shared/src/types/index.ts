export interface StringValue {
  stringValue: string;
}

interface TimestampValue {
  timestampValue: string;
}

export enum Actions {
  VISIT = "visit",
  CLICK = "click",
  // SCROLL = 'scroll', // 🌠 check
  // INPUT = 'input',
  // OTHER = 'other',
}

export interface ClientData {
  localStorageId: string;
  timestamp: string | null;
  url: string | null;
  referer: string | null;
  ua: string | null;
  timezone: string | undefined;
  language: string;
  innerWidth: number | null;
  innerHeight: number | null;
  outerWidth: number | null;
  outerHeight: number | null;
  dpr: number | null;
  saveData: boolean | null;
  type: string | null;
  cookieEnabled: boolean;
  fingerprint: string;
  action: Actions;
}

type ClientFields = {
  [K in keyof ClientData]: K extends "timestamp" ? TimestampValue : StringValue;
};

export interface Fields {
  worker: {
    cookieId: StringValue;
    timestamp: TimestampValue;
    url: StringValue;
    referer: StringValue;
    ua: StringValue;
    timezone: StringValue;
    language: StringValue;
    latitude: StringValue;
    longitude: StringValue;
    city: StringValue;
    region: StringValue;
    country: StringValue;
    ip: StringValue;
    asOrganization: StringValue;
    score: StringValue;
    verifiedBot: StringValue;
  };
  client: ClientFields;
}
