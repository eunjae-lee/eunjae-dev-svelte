import adapter from '@sveltejs/adapter-auto';
import image from 'svelte-image';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import relativeImages from 'mdsvex-relative-images';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		image(),
		mdsvex({
			layout: {
				_: './src/layouts/Post.svelte',
				maison: './src/layouts/MaisonPost.svelte',
			},
			remarkPlugins: [relativeImages],
		}),
		preprocess({ postcss: true }),
	],
	extensions: ['.svelte', '.svx'],
	kit: {
		adapter: adapter(),
		vite: {
			// allows vite access to ./posts
			server: {
				fs: {
					allow: ['./posts'],
				},
			},
		},
	},
};

export default config;
