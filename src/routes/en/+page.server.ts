import { getPosts } from '$lib/server/posts';
import type { RequestEvent } from '../$types';

export async function load({ cookies }: RequestEvent) {
	const posts = (
		await getPosts({
			files: import.meta.glob(`/posts/en/**/index.md`),
			series: 'en',
		})
	).filter((post) => post.meta.featured === true);

	cookies.set('lang', 'en');

	return {
		posts,
	};
}
