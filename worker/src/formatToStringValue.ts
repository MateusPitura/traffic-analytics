import type { StringValue } from '@shared/types';

export function s(value: unknown): StringValue {
	return { stringValue: String(value) };
}
