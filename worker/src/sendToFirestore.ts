import { Env, Fields } from './types';

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
		const collectionName = new URL(fields[0].url.stringValue).hostname
	
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
		const collectionName = new URL(fields.client.mapValue.fields.url.stringValue).hostname;
	
		writes = {
			update: {
				name: `projects/${projectId}/databases/(default)/documents/${collectionName}/${documentId}`,
				fields,
			},
		};
	}

	await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			writes: [writes],
		}),
	});
}
