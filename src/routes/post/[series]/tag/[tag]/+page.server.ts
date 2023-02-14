import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getPosts } from '$lib/server/posts';
import { isValidSeries, SERIES } from '../../../../../series';
import { SERIES_FILES } from '../../../../../series_files';

export async function load({ params }: RequestEvent) {
	const { series, tag } = params;
	if (!isValidSeries(series)) {
		throw error(404);
	}

	if (!tag) {
		throw redirect(307, `/post/${series}`);
	}

	const posts = await getPosts({
		files: SERIES_FILES[series],
		series,
	});

	return {
		series,
		tag,
		...SERIES[series],
		posts: posts.filter((post) => (post.meta.tags || []).includes(tag)),
	};
}
