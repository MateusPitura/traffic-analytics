import { UnwrapArray } from "@shared/types";
import { DomainsCollection } from "@shared/types/firestore";

export interface Env {
	FIREBASE_PROJECT_ID: string;
}

export interface StringValue {
  stringValue: string;
}

interface ObjectValue<T> {
  mapValue: {
    fields: T;
  };
}

type ClientVisitFields = {
  [K in keyof DomainsCollection['client']]: StringValue;
};

export type ClientEventFields = {
  [K in keyof UnwrapArray<DomainsCollection['events']>]: StringValue;
};

type WorkerFields = {
  [K in keyof DomainsCollection['worker']]: StringValue;
};

export type Fields =
  | {
      worker: ObjectValue<WorkerFields>;
      client: ObjectValue<ClientVisitFields>;
    }
  | ClientEventFields[];