export function GET({ request }) {
	return new Response(undefined, {
		status: 307,
		headers: {
			location: request.headers['accept-language']?.includes('ko') ? '/links/ko' : '/links/en',
		}
	});
}
