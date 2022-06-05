const REDIRECT_MAP = {
	'/in-paris': 'https://eunjae.podia.com/in-paris',
	'/community': 'https://eunjae.podia.com/community',
};

export function get({ url }) {
	if (REDIRECT_MAP[url.pathname]) {
		return {
			status: 307,
			headers: {
				location: REDIRECT_MAP[url.pathname],
			},
		};
	} else {
		return {
			status: 404,
		};
	}
}
