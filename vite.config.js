import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		fs: {
			allow: ['./posts'],
		},
	},
	plugins: [sveltekit()],
};

export default config;
