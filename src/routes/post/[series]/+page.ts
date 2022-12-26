import { error } from '@sveltejs/kit';
import type { LoadEvent } from '@sveltejs/kit';
import { SERIES } from '../../../series';

export function load({ params, data: props }: LoadEvent) {
	const { series } = params;
	if (SERIES[series]) {
		return {
			...props,
			...SERIES[series],
			series,
		};
	} else {
		throw error(404);
	}
}
