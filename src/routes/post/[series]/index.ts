import { getPosts } from '$lib/server/posts';
import type { RequestEvent } from '@sveltejs/kit/types/internal';

export const get = async ({ params }: RequestEvent) => {
	let files: Parameters<typeof getPosts>[0]['files'];
	const { series } = params;
	if (series === 'maison') {
		files = import.meta.glob(`/posts/maison/**/index.svx`);
	} else if (series === 'mental-health') {
		files = import.meta.glob(`/posts/mental-health/**/index.svx`);
	} else {
		return {
			status: 404,
		};
	}

	return {
		body: {
			posts: await getPosts({
				files,
				series: params.series,
			}),
		},
	};
};
