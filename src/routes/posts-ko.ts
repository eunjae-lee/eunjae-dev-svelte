const LANG = 'ko';

export const get = async ({ url }) => {
	const slug = url.searchParams.get('slug');

	const files = import.meta.glob(`/posts/${LANG}/**/index.svx`);

	if (slug && files[`/posts/${LANG}/${slug}/index.svx`]) {
		const resolver = files[`/posts/${LANG}/${slug}/index.svx`];
		return {
			body: {
				post: {
					meta: await resolver(),
					path: slug,
				},
			},
		};
	}

	const entries = Object.entries(files);

	const allPosts = await Promise.all(
		entries.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const [, postPath] = new RegExp(`/posts/${LANG}/(.*)/index.svx`).exec(path);

			return {
				meta: metadata,
				path: `/post/${LANG}/${postPath}`,
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
