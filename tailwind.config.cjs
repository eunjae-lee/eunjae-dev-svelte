module.exports = {
	// darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,svx,ts}'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/colors/themes')['[data-theme=light]'],
					primary: '#f28c18',
				},
			},
			'halloween',
		],
		darkTheme: 'halloween',
	},
};
