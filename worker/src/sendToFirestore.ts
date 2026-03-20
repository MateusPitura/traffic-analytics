import { Fields } from '@shared/types';
import { Env } from './types';

const collectionName = 'logs';

export async function sendToFirestore(env: Env, fields: Fields[]) {
	const projectId = env.FIREBASE_PROJECT_ID;
	const apiKey = env.FIREBASE_API_KEY;

	const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:commit?key=${apiKey}`;

	const writes = [];
	for (const item of fields) {
		const documentId = crypto.randomUUID();
		writes.push({
			update: {
				name: `projects/${projectId}/databases/(default)/documents/${collectionName}/${documentId}`,
				fields: item,
			},
		});
	}

	await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			writes,
		}),
	});
}
