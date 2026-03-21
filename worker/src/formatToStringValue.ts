import { StringValue } from "./types";

export function s(value: unknown): StringValue {
	return { stringValue: String(value) };
}
