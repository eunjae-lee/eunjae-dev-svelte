import { error } from '@sveltejs/kit';
import type { LoadEvent } from '@sveltejs/kit';
import { isValidSeries, SERIES } from '../../../series';

export function load({ params, data: props }: LoadEvent) {
	const { series } = params;
	if (!isValidSeries(series)) {
		throw error(404);
	}

	return {
		...props,
		...SERIES[series],
		series,
	};
}
