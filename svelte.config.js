import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import relativeImages from 'mdsvex-relative-images';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		mdsvex({
			layout: {
				_: './src/layouts/Post.svelte',
				maison: './src/layouts/Maison.svelte',
				'mental-health': './src/layouts/MentalHealth.svelte',
			},
			remarkPlugins: [relativeImages],
		}),
		preprocess({ postcss: true }),
	],
	extensions: ['.svelte', '.svx'],
	kit: {
		adapter: adapter(),
	},
};

export default config;
