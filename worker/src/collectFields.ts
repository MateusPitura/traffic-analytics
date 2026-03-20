import { ClientData, Fields, StringValue } from '@shared/types';
import { COOKIE_NAME } from './constants';
import { parseCookies } from './parseCookies';
import { BotManagement } from './types';

function s(value: unknown): StringValue {
	return { stringValue: String(value) };
}

export async function collectFields(request: Request): Promise<Fields> {
	const cookies = parseCookies(request);

	let cookieId = cookies[COOKIE_NAME];
	if (!cookieId) {
		cookieId = crypto.randomUUID();
	}

	const botManagement = request.cf?.botManagement as BotManagement | undefined;
	const cf = request.cf;
	const headers = request.headers;
	const body = await request.json() as ClientData | undefined;

	return {
		worker: {
			cookieId: s(cookieId),
			timestamp: { timestampValue: new Date().toISOString() },
			url: s(request.url),
			referer: s(headers.get('referer')),
			ua: s(headers.get('user-agent')),
			timezone: s(cf?.timezone),
			language: s(headers.get('accept-language')),
			latitude: s(cf?.latitude),
			longitude: s(cf?.longitude),
			city: s(cf?.city),
			region: s(cf?.region),
			country: s(cf?.country),
			ip: s(headers.get('CF-Connecting-IP')),
			asOrganization: s(cf?.asOrganization),
			score: s(botManagement?.score),
			verifiedBot: s(botManagement?.verifiedBot),
		},
		client: {
			localStorageId: s(body?.localStorageId),
			timestamp: { timestampValue: body?.timestamp as string },
			url: s(body?.url),
			referer: s(body?.referer),
			ua: s(body?.ua),
			timezone: s(body?.timezone),
			language: s(body?.language),
			innerWidth: s(body?.innerWidth),
			innerHeight: s(body?.innerHeight),
			outerWidth: s(body?.outerWidth),
			outerHeight: s(body?.outerHeight),
			dpr: s(body?.dpr),
			saveData: s(body?.saveData),
			type: s(body?.type),
			cookieEnabled: s(body?.cookieEnabled),
			fingerprint: s(body?.fingerprint),
			action: s(body?.action),
		}
	};
}
