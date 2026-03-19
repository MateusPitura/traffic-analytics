export interface Env {
	FIREBASE_PROJECT_ID: string;
	FIREBASE_API_KEY: string;
}

interface StringValue {
	stringValue: string;
}

interface TimestampValue {
	timestampValue: string;
}

export interface Fields {
	sessionId: StringValue;
	createdAt: TimestampValue;
}
