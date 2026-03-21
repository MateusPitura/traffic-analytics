import { Fields } from '@shared/types';
import { Env } from './types';

const collectionName = 'logs';

export async function sendToFirestore(env: Env, fields: Fields) {
	const projectId = env.FIREBASE_PROJECT_ID;

	const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:commit`;

	let writes;
	if (Array.isArray(fields)) {
		const values = [];
		for (const item of fields) {
			values.push({
				mapValue: {
					fields: item,
				},
			});
		}

		const documentId = fields[0].sessionId.stringValue;
		writes = [
			{
				transform: {
					document: `projects/${projectId}/databases/(default)/documents/${collectionName}/${documentId}`,
					fieldTransforms: [
						{
							fieldPath: 'events',
							appendMissingElements: {
								values,
							},
						},
					],
				},
			},
		];
	} else {
		const documentId = fields.client.mapValue.fields.sessionId.stringValue;
		writes = {
			update: {
				name: `projects/${projectId}/databases/(default)/documents/${collectionName}/${documentId}`,
				fields,
			},
		};
	}

	const result = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			writes: [writes],
		}),
	});
	console.log('🌠 result: ', result);
}
