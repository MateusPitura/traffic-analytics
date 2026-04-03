import { collectFields } from './collectFields';
import { allowedOrigins, COOKIE_NAME, corsHeaders } from './constants';
import { sendToFirestore } from './sendToFirestore';
import { Env } from './types';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const origin = request.headers.get('Origin');
		let corsOrigin = '';

		if (origin && allowedOrigins.includes(origin)) {
			corsOrigin = origin;
		}

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': corsOrigin,
					...corsHeaders,
				},
			});
		}

		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', { status: 405 });
		}

		const url = new URL(request.url);
		if (url.pathname !== '/') {
			return new Response('Not Found', { status: 404 });
		}

		const { cookieId, fields } = await collectFields(request);

		ctx.waitUntil(sendToFirestore(env, fields));

		return new Response(null, {
			status: 204,
			headers: {
				'Set-Cookie': `${COOKIE_NAME}=${cookieId}; Path=/; Max-Age=31536000; SameSite=None; Secure`,
				'Access-Control-Allow-Origin': corsOrigin,
				...corsHeaders,
			},
		});
	},
} satisfies ExportedHandler<Env>;
