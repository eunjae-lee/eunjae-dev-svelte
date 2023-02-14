import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/server/posts';
import type { RequestEvent } from '@sveltejs/kit/types/internal';
import { isValidSeries, SERIES } from '../../../series';
import { SERIES_FILES } from '../../../series_files';

export async function load({ params }: RequestEvent) {
	const { series } = params;
	if (!isValidSeries(series)) {
		throw error(404);
	}

	const posts = await getPosts({
		files: SERIES_FILES[series],
		series,
	});

	const tagCountMap = posts.reduce<Record<string, number>>((acc, post) => {
		post.meta.tags?.forEach((tag) => {
			if (!acc[tag]) {
				acc[tag] = 0;
			}
			acc[tag] += 1;
		});
		return acc;
	}, {});

	const tags = Object.entries(tagCountMap)
		.sort((a, b) => b[1] - a[1])
		.map((entry) => ({
			name: entry[0],
			count: entry[1],
		}));

	return {
		posts,
		tags,
		series,
		...SERIES[series],
	};
}
