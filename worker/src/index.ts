import { collectFields } from './collectFields';
import { COOKIE_NAME, corsHeaders } from './constants';
import { logToFirestore } from './logToFirestore';
import { Env } from './types';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: corsHeaders,
			});
		}

		if (request.method !== 'POST' || url.pathname !== '/') {
			return new Response('Method Not Allowed', { status: 405 });
		}

		const fields = collectFields(request);

		ctx.waitUntil(logToFirestore(env, fields));

		return new Response(null, {
			status: 204,
			headers: {
				'Set-Cookie': `${COOKIE_NAME}=${fields.sessionId.stringValue}; Path=/; Max-Age=31536000; SameSite=Lax`,
				...corsHeaders
			},
		});
	},
} satisfies ExportedHandler<Env>;
