module.exports = {
	// darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,svx,ts}'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: ['light', 'halloween'],
		darkTheme: 'halloween',
	},
};
