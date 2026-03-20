import { collectFields } from './collectFields';
import { COOKIE_NAME, corsHeaders } from './constants';
import { sendToFirestore } from './sendToFirestore';
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

		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', { status: 405 });
		}

		if (url.pathname !== '/') {
			return new Response('Not Found', { status: 404 });
		}

		const {cookieId, fields} = await collectFields(request);

		ctx.waitUntil(sendToFirestore(env, fields));

		return new Response(null, {
			status: 204,
			headers: {
				'Set-Cookie': `${COOKIE_NAME}=${cookieId}; Path=/; Max-Age=31536000; SameSite=None; Secure`,
				...corsHeaders,
			},
		});
	},
} satisfies ExportedHandler<Env>;
