import { UnwrapArray } from '@shared/types';
import { DomainsCollection } from '@shared/types/firestore';
import { collectEventFields } from './collectEventFields';
import { collectVisitFields } from './collectVisitFields';
import { COOKIE_NAME } from './constants';
import { parseCookies } from './parseCookies';
import { Fields } from './types';

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
					body: item as UnwrapArray<DomainsCollection['events']>,
				})
			);
		}
	} else {
		fields = collectVisitFields({
			body: body as DomainsCollection['client'],
			cookieId,
			request,
		});
	}

	return {
		fields,
		cookieId,
	};
}
