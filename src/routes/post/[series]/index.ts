import { getPosts } from '$lib/server/posts';
import type { RequestEvent } from '@sveltejs/kit/types/internal';

export const get = async ({ params }: RequestEvent) => {
	let files: Parameters<typeof getPosts>[0]['files'];
	if (params.series === 'maison') {
		files = import.meta.glob(`/posts/maison/**/index.svx`);
	} else {
		return {
			body: { posts: [] },
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
