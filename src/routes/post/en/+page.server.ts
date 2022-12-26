import { getPosts } from '$lib/server/posts';

export async function load() {
	return {
		posts: await getPosts({
			files: import.meta.glob(`/posts/en/**/index.svx`),
			series: 'en',
		}),
	};
}
