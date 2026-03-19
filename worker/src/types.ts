export interface Env {
	FIREBASE_PROJECT_ID: string;
	FIREBASE_API_KEY: string;
}

export interface StringValue {
	stringValue: string;
}

interface TimestampValue {
	timestampValue: string;
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
	latitude: StringValue;
	longitude: StringValue;
	country: StringValue;
	city: StringValue;
	region: StringValue;
	timezone: StringValue;
	ip: StringValue;
	action: StringValue;
	score: StringValue;
	verifiedBot: StringValue;
	url: StringValue;
	referer: StringValue;
	ua: StringValue;
	acceptLanguage: StringValue;
	asOrganization: StringValue;
}

export interface BotManagement {
	score?: string;
	verifiedBot?: string;
}
