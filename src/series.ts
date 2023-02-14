export type SeriesType = 'maison' | 'mental-health' | 'tweet';

export const isValidSeries = (series: string | undefined): series is SeriesType => {
	return ['maison', 'mental-health', 'tweet'].includes(series || '');
};

export type Series = { title: string; description: string; lang: string };

export const SERIES: Record<SeriesType, Series> = {
	'mental-health': {
		title: 'Growing Mental Muscle',
		description: `I want to be stronger, mentally. So let's get started. I'm putting time, money and effort. I already know this is going to be an incredible investment for my happy life.`,
		lang: 'en',
	},
	maison: {
		title: 'Maison',
		description: 'This is going to be a long and difficult but exciting journey, right?',
		lang: 'en',
	},
	tweet: {
		title: '트윗 모음',
		description: '그간 적어내린 무수히 많은 트윗 중 일부를 모았어요',
		lang: 'ko',
	},
};
