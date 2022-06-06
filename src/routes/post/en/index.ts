import { getPosts } from '$lib/server/posts';

export const get = async () => {
	return {
		body: {
			posts: await getPosts({
				files: import.meta.glob(`/posts/en/**/index.svx`),
				series: 'en',
			}),
		},
	};
};
