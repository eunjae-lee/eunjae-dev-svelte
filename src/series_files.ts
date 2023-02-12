import type { Files } from '$lib/types';
import type { Series } from './series';

export const SERIES_FILES: Record<Series, Files> = {
	'mental-health': import.meta.glob(`/posts/mental-health/**/index.svx`) as Files,
	maison: import.meta.glob(`/posts/maison/**/index.svx`) as Files,
	tweet: import.meta.glob(`/posts/tweet/**/index.svx`) as Files,
};
