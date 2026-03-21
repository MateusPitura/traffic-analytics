import { UnwrapArray } from '@shared/types';
import { s } from './formatToStringValue';
import { DomainsCollection } from '@shared/types/firestore';
import { ClientEventFields } from './types';

interface CollectEventFieldsProperties {
    body: UnwrapArray<DomainsCollection['events']>
}

export function collectEventFields({
    body
}: CollectEventFieldsProperties): ClientEventFields {
	return {
		timestamp: s(body?.timestamp),
		metadata: s(body?.metadata),
		action: s(body?.action),
		sessionId: s(body?.sessionId),
		url: s(body?.url),
	};
}
