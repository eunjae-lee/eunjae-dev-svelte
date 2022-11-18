export function get({ request }) {
	return {
		status: 307,
		headers: {
			location: request.headers['accept-language']?.includes('ko') ? '/links/ko' : '/links/en',
		},
	};
}
