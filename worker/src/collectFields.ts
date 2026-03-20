import { Action, ClientData, ClientEventData, ClientVisitData, Fields } from '@shared/types';
import { COOKIE_NAME } from './constants';
import { s } from './formatToStringValue';
import { parseCookies } from './parseCookies';
import { BotManagement } from './types';

export async function collectFields(request: Request): Promise<Fields> {
	const cookies = parseCookies(request);

	let cookieId = cookies[COOKIE_NAME];
	if (!cookieId) {
		cookieId = crypto.randomUUID();
	}

	const body = (await request.json()) as ClientData | undefined;

	if (body?.action !== Action.VISIT) {
		const clientEventData = body as ClientEventData;

		return {
			worker: {
				mapValue: {
					fields: {
						cookieId: s(cookieId),
						timestamp: { timestampValue: new Date().toISOString() },
					},
				},
			},
			client: {
				mapValue: {
					fields: {
						localStorageId: s(clientEventData?.localStorageId),
						timestamp: { timestampValue: clientEventData?.timestamp as string },
						metadata: s(clientEventData?.metadata),
						action: s(clientEventData?.action),
					},
				},
			},
		};
	}

	const botManagement = request.cf?.botManagement as BotManagement | undefined;
	const cf = request.cf;
	const headers = request.headers;
	const clientVisitData = body as ClientVisitData;

	return {
		worker: {
			mapValue: {
				fields: {
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
			},
		},
		client: {
			mapValue: {
				fields: {
					localStorageId: s(clientVisitData?.localStorageId),
					timestamp: { timestampValue: clientVisitData?.timestamp as string },
					url: s(clientVisitData?.url),
					referer: s(clientVisitData?.referer),
					ua: s(clientVisitData?.ua),
					timezone: s(clientVisitData?.timezone),
					language: s(clientVisitData?.language),
					innerWidth: s(clientVisitData?.innerWidth),
					innerHeight: s(clientVisitData?.innerHeight),
					outerWidth: s(clientVisitData?.outerWidth),
					outerHeight: s(clientVisitData?.outerHeight),
					dpr: s(clientVisitData?.dpr),
					saveData: s(clientVisitData?.saveData),
					type: s(clientVisitData?.type),
					cookieEnabled: s(clientVisitData?.cookieEnabled),
					fingerprint: s(clientVisitData?.fingerprint),
					action: s(clientVisitData?.action),
				},
			},
		},
	};
}
