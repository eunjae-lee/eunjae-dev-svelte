import { getPosts } from '$lib/server/posts';

export async function load() {
	const posts = (
		await getPosts({
			files: import.meta.glob(`/posts/ko/**/index.svx`),
			series: 'ko',
		})
	).filter((post) => post.meta.featured === true);

	return {
		posts,
	};
}
