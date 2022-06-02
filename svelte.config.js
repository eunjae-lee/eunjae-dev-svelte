import adapter from '@sveltejs/adapter-auto';
import image from 'svelte-image';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [image(), mdsvex({
		layout: {
			_: "./src/layouts/Blog.svelte"
		}
	}), preprocess({ postcss: true })],
	extensions: ['.svelte', '.svx'],
	kit: {
		adapter: adapter(),
	},
};

export default config;
