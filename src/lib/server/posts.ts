import type { PostMeta } from '$lib/types';

export async function getPosts({
	files,
	series,
}: {
	files: Record<string, () => Promise<{ metadata: PostMeta['meta'] }>>;
	series: string;
}): Promise<PostMeta[]> {
	const entries = Object.entries(files);

	const allPosts = (
		await Promise.all(
			entries.map(async ([path, resolver]) => {
				const { metadata } = await resolver();
				const [, slug] = new RegExp(`/posts/${series}/(.*)/index.svx`).exec(path);

				if (!metadata) {
					console.error('# metadata is null', path);
					return null;
				}

				const relativePath = `/post/${series}/${slug}`;
				return {
					meta: { ...metadata, path: relativePath },
					path: relativePath,
				};
			})
		)
	).filter(Boolean);

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.created_at).getTime() - new Date(a.meta.created_at).getTime();
	});

	return sortedPosts;
}
