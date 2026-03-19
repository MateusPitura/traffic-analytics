import { COOKIE_NAME } from './constants';
import { parseCookies } from './parseCookies';
import { Actions, Fields } from './types';

export function collectFields(request: Request): Fields {
	const cookies = parseCookies(request);

	let sessionId = cookies[COOKIE_NAME];
	if (!sessionId) {
		sessionId = crypto.randomUUID();
	}

	return {
		sessionId: { stringValue: sessionId },
		createdAt: { timestampValue: new Date().toISOString() },
		location: {
			mapValue: {
				fields: {
					city: { stringValue: (request.cf?.city as string) || 'Unknown' },
					country: { stringValue: (request.cf?.country as string) || 'Unknown' },
					latitude: { stringValue: (request.cf?.latitude as string) || 'Unknown' },
					longitude: { stringValue: (request.cf?.longitude as string) || 'Unknown' },
					region: { stringValue: (request.cf?.region as string) || 'Unknown' },
					timezone: { stringValue: (request.cf?.timezone as string) || 'Unknown' },
				},
			},
		},
		ip: { stringValue: request.headers.get('CF-Connecting-IP') || 'Unknown' },
		action: { stringValue: Actions.VISIT },
	};
}
