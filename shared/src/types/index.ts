export interface StringValue {
  stringValue: string;
}

interface TimestampValue {
  timestampValue: string;
}

interface ObjectValue<T> {
  mapValue: {
    fields: T;
  };
}

export enum Action {
  VISIT = "visit",
  CLICK = "click",
  OTHER = 'other',
}

export interface ClientData {
  localStorageId: string;
  timestamp: string | null;
  action: Action;
}

export interface ClientVisitData extends ClientData {
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
}

type ClientVisitFields = {
  [K in keyof ClientVisitData]: K extends "timestamp"
    ? TimestampValue
    : StringValue;
};

export interface ClientEventData extends ClientData {
  metadata: string | null;
}

type ClientEventFields = {
  [K in keyof ClientEventData]: K extends "timestamp"
    ? TimestampValue
    : StringValue;
};

interface WorkerFields {
  cookieId: StringValue;
  timestamp: TimestampValue;
}

interface WorkerVisitFields extends WorkerFields {
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
}

type WorkerEventFields = WorkerFields;

export type Fields =
  | {
      worker: ObjectValue<WorkerVisitFields>;
      client: ObjectValue<ClientVisitFields>;
    }
  | {
      worker: ObjectValue<WorkerEventFields>;
      client: ObjectValue<ClientEventFields>;
    };
