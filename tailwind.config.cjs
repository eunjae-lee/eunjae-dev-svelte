module.exports = {
	content: ['./src/**/*.{html,js,svelte,svx,ts}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light', 'halloween'],
		darkTheme: 'halloween',
	},
};
