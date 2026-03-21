export interface StringValue {
  stringValue: string;
}

interface ObjectValue<T> {
  mapValue: {
    fields: T;
  };
}

export enum Action {
  VISIT = "visit",
  CLICK = "click",
  OTHER = "other",
}

interface ClientData {
  timestamp: string;
  action: Action;
  sessionId: string;
  url: string;
}

export interface ClientVisitData extends ClientData {
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
}

type ClientVisitFields = {
  [K in keyof ClientVisitData]: StringValue;
};

export interface ClientEventData extends ClientData {
  metadata: string | null;
}

export type ClientEventFields = {
  [K in keyof ClientEventData]: StringValue;
};

interface WorkerFields {
  cookieId: StringValue;
  timestamp: StringValue;
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

export type Fields =
  | {
      worker: ObjectValue<WorkerFields>;
      client: ObjectValue<ClientVisitFields>;
    }
  | ClientEventFields[];
