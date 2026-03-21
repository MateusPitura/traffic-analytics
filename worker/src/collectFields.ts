import { ClientEventData, ClientVisitData, Fields } from '@shared/types';
import { collectEventFields } from './collectEventFields';
import { collectVisitFields } from './collectVisitFields';
import { COOKIE_NAME } from './constants';
import { parseCookies } from './parseCookies';

interface CollectFieldsReturn {
	fields: Fields;
	cookieId: string;
}

export async function collectFields(request: Request): Promise<CollectFieldsReturn> {
	const cookies = parseCookies(request);

	let cookieId = cookies[COOKIE_NAME];
	if (!cookieId) {
		cookieId = crypto.randomUUID();
	}

	const body = await request.json();

	let fields;
	if (Array.isArray(body)) {
		fields = [];
		for (const item of body) {
			fields.push(
				collectEventFields({
					body: item as ClientEventData,
				})
			);
		}
	} else {
		fields = collectVisitFields({
			body: body as ClientVisitData,
			cookieId,
			request,
		});
	}

	return {
		fields,
		cookieId,
	};
}
