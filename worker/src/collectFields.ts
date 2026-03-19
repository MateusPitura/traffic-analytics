import { COOKIE_NAME } from './constants';
import { parseCookies } from './parseCookies';
import { Actions, BotManagement, Fields, StringValue } from './types';

function s(value: unknown): StringValue {
	return { stringValue: String(value) };
}

export function collectFields(request: Request): Fields {
	const cookies = parseCookies(request);

	let sessionId = cookies[COOKIE_NAME];
	if (!sessionId) {
		sessionId = crypto.randomUUID();
	}

	const botManagement = request.cf?.botManagement as BotManagement | undefined;
	const cf = request.cf;
	const headers = request.headers;

	return {
		sessionId: s(sessionId),
		createdAt: { timestampValue: new Date().toISOString() },
		city: s(cf?.city),
		region: s(cf?.region),
		country: s(cf?.country),
		latitude: s(cf?.latitude),
		longitude: s(cf?.longitude),
		timezone: s(cf?.timezone),
		acceptLanguage: s(headers.get('accept-language')),
		action: { stringValue: Actions.VISIT },
		score: s(botManagement?.score),
		verifiedBot: s(botManagement?.verifiedBot),
		url: s(request.url),
		referer: s(headers.get('referer')),
		ua: s(headers.get('user-agent')),
		ip: s(headers.get('CF-Connecting-IP')),
		asOrganization: s(cf?.asOrganization),
	};
}
