import { Env, Fields } from './types';

const collectionName = 'logs';

export async function logToFirestore(env: Env, fields: Fields) {
	const projectId = env.FIREBASE_PROJECT_ID;
	const apiKey = env.FIREBASE_API_KEY;

	const endpoint = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}?key=${apiKey}`;

	await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ fields }),
	});
}
