import { ClientEventData, ClientEventFields } from '@shared/types';
import { s } from './formatToStringValue';

interface CollectEventFieldsProperties {
    body: ClientEventData
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
