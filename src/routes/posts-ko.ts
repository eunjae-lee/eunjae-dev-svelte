export const get = async () => {
	const files = import.meta.glob('/posts/ko/**/index.svx');
	const entries = Object.entries(files);

	const allPosts = await Promise.all(
		entries.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const [, postPath] = new RegExp('/posts/ko/(.*)/index.svx').exec(path);

			return {
				meta: metadata,
				path: `/post/ko/${postPath}`,
			};
		})
	);

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.created_at).getTime() - new Date(a.meta.created_at).getTime();
	});

	return {
		body: { posts: sortedPosts },
	};
};
