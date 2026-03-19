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

interface ObjectValue<T> {
	mapValue: {
		fields: T;
	};
}

export enum Actions {
	VISIT = 'visit',
	CLICK = 'click',
	// SCROLL = 'scroll', // 🌠 check
	// INPUT = 'input',
	// OTHER = 'other',
}

export interface Fields {
	sessionId: StringValue;
	createdAt: TimestampValue;
	location: ObjectValue<{
		latitude: StringValue;
		longitude: StringValue;
		country: StringValue;
		city: StringValue;
		region: StringValue;
		timezone: StringValue;
	}>;
	ip: StringValue;
	action: StringValue;
}
