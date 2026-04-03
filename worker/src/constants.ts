export const COOKIE_NAME = 'traffic_analytics_cookie_id';

export const allowedOrigins = [
	'https://mateuspitura.com',
	'https://url.mateuspitura.com',
	'https://dms.mateuspitura.com',
	'https://saas.mateuspitura.com',
];

export const corsHeaders = {
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Credentials': 'true',
	Vary: 'Origin',
};
