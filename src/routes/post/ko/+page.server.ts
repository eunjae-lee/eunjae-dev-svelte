import { getPosts } from '$lib/server/posts';

export async function load() {
	return {
		posts: await getPosts({
			files: import.meta.glob(`/posts/ko/**/index.svx`),
			series: 'ko',
		}),
	};
}
