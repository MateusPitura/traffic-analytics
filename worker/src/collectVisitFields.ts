import { ClientVisitData, Fields } from '@shared/types';
import { s } from './formatToStringValue';
import { BotManagement } from './types';

interface CollectVisitFieldsProperties {
	request: Request;
	body: ClientVisitData;
	cookieId: string;
}

export function collectVisitFields({ request, body, cookieId }: CollectVisitFieldsProperties): Fields {
	const botManagement = request.cf?.botManagement as BotManagement | undefined;
	const cf = request.cf;
	const headers = request.headers;

	return {
		worker: {
			mapValue: {
				fields: {
					cookieId: s(cookieId),
					timestamp: s(new Date().toISOString()),
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
			},
		},
		client: {
			mapValue: {
				fields: {
					localStorageId: s(body?.localStorageId),
					timestamp: s(body?.timestamp),
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
					sessionId: s(body?.sessionId),
				},
			},
		},
	};
}
