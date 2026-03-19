import { COOKIE_NAME } from './constants';
import { parseCookies } from './parseCookies';
import { Fields } from './types';

export function collectFields(request: Request): Fields {
	const cookies = parseCookies(request);

	let sessionId = cookies[COOKIE_NAME];
	if (!sessionId) {
		sessionId = crypto.randomUUID();
	}

	return {
		sessionId: { stringValue: sessionId },
		createdAt: { timestampValue: new Date().toISOString() },
	};
}
