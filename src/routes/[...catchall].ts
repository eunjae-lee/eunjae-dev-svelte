export function get({ request, url }) {
	console.log('# url', url.pathname, redirectMap);
	return {
		status: 307,
		headers: {
			location: request.headers['accept-language']?.includes('ko') ? '/ko' : '/en',
		},
	};
}
