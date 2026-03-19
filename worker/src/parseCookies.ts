export function parseCookies(request: Request) {
    const cookieHeader = request.headers.get("Cookie") || ""

	return Object.fromEntries(
		cookieHeader.split(';').map((c) => {
			const [key, ...v] = c.trim().split('=');
			return [key, decodeURIComponent(v.join('='))];
		})
	);
}
