import type { Theme } from '$lib/types';

export function setTheme(theme: Theme) {
	const updateDom = (theme: 'dark' | 'light') => {
		const html = document.querySelector('html');
		html.setAttribute('data-theme', theme);
		// html.classList.remove('dark');
		// html.classList.remove('light');
		// html.classList.add(theme);
	};

	if (theme === 'system') {
		updateDom(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	} else {
		updateDom(theme);
	}
	localStorage.setItem('theme', theme);
}
