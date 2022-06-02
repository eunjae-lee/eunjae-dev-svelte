export function get({ request }) {
	return {
		status: 307,
		headers: {
			location: request.headers['accept-language']?.includes('ko') ? '/ko' : '/en',
		},
	};
}
