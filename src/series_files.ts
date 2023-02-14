import type { Files } from '$lib/types';
import type { SeriesType } from './series';

export const SERIES_FILES: Record<SeriesType, Files> = {
	'mental-health': import.meta.glob(`/posts/mental-health/**/index.md`) as Files,
	maison: import.meta.glob(`/posts/maison/**/index.md`) as Files,
	tweet: import.meta.glob(`/posts/tweet/**/index.md`) as Files,
};
