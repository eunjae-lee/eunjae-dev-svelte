import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/server/posts';
import type { RequestEvent } from '@sveltejs/kit/types/internal';
import { isValidSeries } from '../../../series';
import { SERIES_FILES } from '../../../series_files';

export async function load({ params }: RequestEvent) {
	const { series } = params;
	if (!isValidSeries(series)) {
		throw error(404);
	}

	return {
		posts: await getPosts({
			files: SERIES_FILES[series],
			series,
		}),
	};
}
