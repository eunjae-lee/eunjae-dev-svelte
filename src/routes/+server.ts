import type { RequestEvent } from './$types';

export function GET({ request, cookies }: RequestEvent) {
	let lang = cookies.get('lang');
	if (lang !== 'ko' && lang !== 'en') {
		lang = request.headers.get('accept-language')?.includes('ko') ? 'ko' : 'en';
	}

	return new Response(undefined, {
		status: 307,
		headers: {
			location: `/${lang}`,
		},
	});
}
