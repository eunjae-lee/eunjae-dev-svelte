const REDIRECT_MAP = {
	// shortcuts
	'/in-paris': 'https://eunjae.podia.com/in-paris',
	'/community': 'https://eunjae.podia.com/community',

	'/posts-en': '/post/en',
	'/posts-ko': '/post/ko',
	'/maison': '/post/maison',
	'/maison/1': '/post/maison/1',
	'/maison/2': '/post/maison/2',
	'/maison/3': '/post/maison/3',
	'/maison/4': '/post/maison/4',
	'/maison/5': '/post/maison/5',
	'/maison/6': '/post/maison/6',
	'/maison/7': '/post/maison/7',
	'/maison/8': '/post/maison/8',

	// english posts with /en prefix
	'/post/2-years-algolia-and-france': '/post/en/2-years-algolia-and-france',
	'/post/2021-review': '/post/en/2021-review',
	'/post/abandoning-a-side-project': '/post/en/abandoning-a-side-project',
	'/post/algolia-1yr': '/post/en/algolia-1yr',
	'/post/create-social-image-in-sanity-studio': '/post/en/create-social-image-in-sanity-studio',
	'/post/create-social-image-using-puppeteer': '/post/en/create-social-image-using-puppeteer',
	'/post/deploy-to-vercel-from-sanity-studio': '/post/en/deploy-to-vercel-from-sanity-studio',
	'/post/dotjs-2019': '/post/en/dotjs-2019',
	'/post/gatsby-algolia': '/post/en/gatsby-algolia',
	'/post/gatsby-hygen': '/post/en/gatsby-hygen',
	'/post/ice-pack': '/post/en/ice-pack',
	'/post/move-cat': '/post/en/move-cat',
	'/post/osx-setup': '/post/en/osx-setup',
	'/post/release-open-source-library-2020': '/post/en/release-open-source-library-2020',
	'/post/search-supabase-autocomplete': '/post/en/search-supabase-autocomplete',
	'/post/yarn-publish': '/post/en/yarn-publish',
};

export function get({ url }) {
	if (REDIRECT_MAP[url.pathname]) {
		return {
			status: 307,
			headers: {
				location: REDIRECT_MAP[url.pathname],
			},
		};
	} else {
		return {
			status: 404,
		};
	}
}
