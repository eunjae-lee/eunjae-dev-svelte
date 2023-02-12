export type Series = 'maison' | 'mental-health' | 'tweet';

export const isValidSeries = (series: string | undefined): series is Series => {
	return ['maison', 'mental-health', 'tweet'].includes(series || '');
};

export const SERIES: Record<Series, { title: string; description: string }> = {
	'mental-health': {
		title: 'Growing Mental Muscle',
		description: `I want to be stronger, mentally. So let's get started. I'm putting time, money and effort. I already know this is going to be an incredible investment for my happy life.`,
	},
	maison: {
		title: 'Maison',
		description: 'This is going to be a long and difficult but exciting journey, right?',
	},
	tweet: {
		title: 'Tweets',
		description: 'A collection of my tweets',
	},
};
